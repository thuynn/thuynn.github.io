import { useId, useRef, useState, type KeyboardEvent } from 'react';
import { contrastRatio } from '../../lib/contrast';

type Ramp = { name: string; steps: Record<string, string> };

const STEPS = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];

/** Primitive ramps from the Alpha Design System (Figma Variables). */
const RAMPS: Ramp[] = [
  {
    name: 'Primary',
    steps: { '50': '#f2eaff', '100': '#e5d5ff', '200': '#cbabff', '300': '#b181ff', '400': '#9758ff', '500': '#7d2eff', '600': '#6425cd', '700': '#4c1c9b', '800': '#331269', '900': '#1b0937', '950': '#0e051e' },
  },
  {
    name: 'Red',
    steps: { '50': '#ffe5e5', '100': '#ffcccc', '200': '#ff9999', '300': '#ff6666', '400': '#ff3333', '500': '#ff0000', '600': '#cc0000', '700': '#990000', '800': '#660000', '900': '#330000', '950': '#190000' },
  },
  {
    name: 'Green',
    steps: { '50': '#e7ffec', '100': '#cfffd9', '200': '#9fffb2', '300': '#6fff8c', '400': '#3fff65', '500': '#0fff3f', '600': '#0ccc32', '700': '#099926', '800': '#066619', '900': '#03330d', '950': '#011906' },
  },
  {
    name: 'Yellow',
    steps: { '50': '#fffee5', '100': '#fffdcc', '200': '#fffc99', '300': '#fffa66', '400': '#fff933', '500': '#fff700', '600': '#ccc500', '700': '#999400', '800': '#666300', '900': '#333100', '950': '#191900' },
  },
];

function Badge({ ratio }: { ratio: number }) {
  const label = ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : ratio >= 3 ? 'AA Large' : 'Fail';
  const ok = ratio >= 4.5;
  return (
    <span
      className={`rounded-full px-2 py-0.5 font-mono text-[11px] font-semibold ${ok ? 'bg-accent-soft text-accent' : 'bg-red-500/10 text-red-600 dark:text-red-400'}`}
    >
      {label}
    </span>
  );
}

export default function TokenExplorer() {
  const [rampIndex, setRampIndex] = useState(0);
  const [step, setStep] = useState('500');
  const [copied, setCopied] = useState(false);
  const swatchRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const labelId = useId();

  const ramp = RAMPS[rampIndex];
  const hex = ramp.steps[step];
  const token = `--color-${ramp.name.toLowerCase()}-${step}`;
  const onWhite = contrastRatio(hex, '#ffffff') ?? 1;
  const onBlack = contrastRatio(hex, '#000000') ?? 1;

  const select = (i: number) => {
    const next = STEPS[(i + STEPS.length) % STEPS.length];
    setStep(next);
    swatchRefs.current[STEPS.indexOf(next)]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent, i: number) => {
    const keys: Record<string, number> = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: STEPS.length - 1 };
    if (e.key in keys) {
      e.preventDefault();
      select(keys[e.key]);
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(`var(${token})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="card overflow-hidden">
      <div className="flex flex-wrap gap-2 border-b border-line p-4" role="tablist" aria-label="Color ramps">
        {RAMPS.map((r, i) => (
          <button
            key={r.name}
            role="tab"
            aria-selected={i === rampIndex}
            onClick={() => setRampIndex(i)}
            className="rounded-full px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:text-fg aria-selected:bg-accent aria-selected:text-accent-fg"
          >
            {r.name}
          </button>
        ))}
      </div>

      <div className="p-4 sm:p-6">
        <p id={labelId} className="sr-only">
          {ramp.name} color steps. Use arrow keys to move between swatches.
        </p>
        <div role="radiogroup" aria-labelledby={labelId} className="grid grid-cols-6 gap-2 sm:grid-cols-11">
          {STEPS.map((s, i) => (
            <button
              key={s}
              ref={(el) => {
                swatchRefs.current[i] = el;
              }}
              role="radio"
              aria-checked={s === step}
              aria-label={`${ramp.name} ${s}, ${ramp.steps[s]}`}
              tabIndex={s === step ? 0 : -1}
              onClick={() => setStep(s)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className="group flex flex-col items-center gap-1.5"
            >
              <span
                className="block aspect-square w-full rounded-lg border border-black/5 ring-offset-2 ring-offset-surface transition group-aria-checked:ring-2 group-aria-checked:ring-accent"
                style={{ background: ramp.steps[s] }}
              />
              <span className="font-mono text-[11px] text-muted group-aria-checked:font-semibold group-aria-checked:text-fg">{s}</span>
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
          <div className="flex items-center gap-4">
            <span className="size-16 shrink-0 rounded-xl border border-black/5" style={{ background: hex }} />
            <div className="min-w-0">
              <p className="font-mono text-sm font-semibold">{token}</p>
              <p className="font-mono text-sm text-muted">{hex.toUpperCase()}</p>
            </div>
          </div>
          <button onClick={copy} className="btn-ghost justify-center" aria-live="polite">
            {copied ? 'Copied!' : 'Copy CSS variable'}
          </button>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {[
            { bg: '#ffffff', fg: hex, ratio: onWhite, label: 'on white' },
            { bg: '#000000', fg: hex, ratio: onBlack, label: 'on black' },
          ].map((c) => (
            <div key={c.label} className="flex items-center justify-between rounded-xl border border-line p-4" style={{ background: c.bg }}>
              <span className="text-lg font-semibold" style={{ color: c.fg }}>
                Aa {c.label}
              </span>
              <span className="flex items-center gap-2">
                <span className="font-mono text-xs" style={{ color: c.bg === '#ffffff' ? '#333' : '#ddd' }}>
                  {c.ratio.toFixed(2)}:1
                </span>
                <Badge ratio={c.ratio} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

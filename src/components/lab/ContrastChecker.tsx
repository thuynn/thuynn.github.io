import { useId, useState } from 'react';
import { contrastRatio, hexToRgb, wcagLevels } from '../../lib/contrast';

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const id = useId();
  const valid = hexToRgb(value) !== null;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          aria-label={`${label} picker`}
          value={valid ? (value.length === 4 ? `#${value.slice(1).split('').map((c) => c + c).join('')}` : value) : '#000000'}
          onChange={(e) => onChange(e.target.value)}
          className="size-10 cursor-pointer rounded-lg border border-line bg-transparent"
        />
        <input
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={!valid}
          spellCheck={false}
          className="w-full rounded-lg border border-line bg-surface px-3 py-2 font-mono text-sm aria-[invalid=true]:border-red-500"
        />
      </div>
    </div>
  );
}

const Row = ({ label, pass }: { label: string; pass: boolean }) => (
  <li className="flex items-center justify-between border-b border-line py-2 text-sm last:border-0">
    <span>{label}</span>
    <span className={`font-mono text-xs font-semibold ${pass ? 'text-accent' : 'text-red-600 dark:text-red-400'}`}>{pass ? 'PASS' : 'FAIL'}</span>
  </li>
);

export default function ContrastChecker() {
  const [fg, setFg] = useState('#237378');
  const [bg, setBg] = useState('#ffffff');
  const ratio = contrastRatio(fg, bg);
  const levels = ratio ? wcagLevels(ratio) : null;

  return (
    <div className="card grid gap-6 p-4 sm:p-6 md:grid-cols-2">
      <div className="flex flex-col gap-4">
        <ColorField label="Text color" value={fg} onChange={setFg} />
        <ColorField label="Background color" value={bg} onChange={setBg} />
        <button
          type="button"
          onClick={() => {
            setFg(bg);
            setBg(fg);
          }}
          className="btn-ghost self-start"
        >
          ⇅ Swap
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <div className="rounded-xl border border-line p-5" style={{ background: hexToRgb(bg) ? bg : undefined, color: hexToRgb(fg) ? fg : undefined }}>
          <p className="text-2xl font-semibold">Large text, 24px</p>
          <p className="mt-1 text-sm">Body text at 14px should stay readable for everyone.</p>
        </div>
        <p className="text-3xl font-semibold tracking-tight" aria-live="polite">
          {ratio ? `${ratio.toFixed(2)} : 1` : 'Enter valid hex colors'}
        </p>
        {levels && (
          <ul>
            <Row label="AA · normal text (4.5:1)" pass={levels.aaNormal} />
            <Row label="AA · large text (3:1)" pass={levels.aaLarge} />
            <Row label="AAA · normal text (7:1)" pass={levels.aaaNormal} />
            <Row label="AAA · large text (4.5:1)" pass={levels.aaaLarge} />
          </ul>
        )}
      </div>
    </div>
  );
}

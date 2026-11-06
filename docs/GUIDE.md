# Hướng dẫn dự án

Tài liệu này giải thích cách site được tổ chức và cách làm các việc thường gặp: viết bài, thêm case study, đổi màu,
deploy.

---

## 1. Tổng quan

| Thành phần | Công nghệ | Ghi chú |
| --- | --- | --- |
| Khung site | Astro 7 | Xuất ra HTML tĩnh, không cần server |
| Ngôn ngữ | TypeScript | |
| Style | Tailwind CSS 4 + `@tailwindcss/typography` | Token khai báo trong `src/styles/global.css` |
| Nội dung | MDX (Markdown + component) | Content collections có kiểm tra schema |
| Tương tác | React 19 | Chỉ dùng cho các "island" trong Lab |
| Font | Inter, JetBrains Mono (self-host qua Fontsource) | |
| Hosting | GitHub Pages + GitHub Actions | Tự deploy khi push lên `main` |

Ngôn ngữ giao diện là **tiếng Anh**. Bài blog có thể viết **tiếng Anh hoặc tiếng Việt** (`lang: vi`).

---

## 2. Cấu trúc thư mục

```text
.github/workflows/deploy.yml   Build + deploy lên GitHub Pages
public/                        File tĩnh copy nguyên trạng (favicon, CV PDF)
src/
  site.ts                      Tên, email, link GitHub, link CV, menu
  content.config.ts            Schema cho "work" và "blog"
  utils.ts                     getWork(), getPosts(), formatDate(), readingTime()
  styles/global.css            Design tokens + class dùng chung
  layouts/BaseLayout.astro     <head>, SEO, dark mode, header/footer
  components/
    Header.astro, Footer.astro
    WorkCard.astro             Thẻ case study
    PostItem.astro             Dòng bài viết trong danh sách
    mdx/                       Component dùng trong bài MDX
      Figure.astro             Ảnh + chú thích
      Callout.astro            Khung ghi chú
      TokenLayers.astro        Sơ đồ 5 lớp token (case study Spectos)
    lab/                       Component React tương tác
      TokenExplorer.tsx
      ContrastChecker.tsx
  lib/contrast.ts              Tính tỉ lệ tương phản WCAG
  content/
    work/*.mdx                 Case study
    blog/*.mdx                 Bài viết
  assets/work/<slug>/          Ảnh của từng case study (được tối ưu tự động)
  pages/                       Mỗi file = một URL
    index.astro                /
    work/index.astro           /work/
    work/[...slug].astro       /work/<slug>/
    blog/index.astro           /blog/
    blog/[...slug].astro       /blog/<slug>/
    blog/tags/[tag].astro      /blog/tags/<tag>/
    lab.astro, about.astro, 404.astro, rss.xml.ts
docs/                          Tài liệu này + kế hoạch
```

---

## 3. Chạy trên máy

```powershell
cd C:\working\thuynn.github.io
npm install          # lần đầu
npm run dev          # mở http://localhost:4321, tự reload khi sửa file
npm run build        # build thử — nên chạy trước khi push
npm run preview      # xem bản build
```

Ở chế độ `dev`, bài có `draft: true` **vẫn hiện**. Khi build thật, bài nháp bị ẩn.

---

## 4. Viết bài blog

1. Tạo file `src/content/blog/<slug>.mdx`. Tên file chính là URL: `blog/<slug>/`. Dùng chữ thường, không dấu, nối
   bằng `-`.
2. Điền frontmatter:

```mdx
---
title: 'Tiêu đề bài viết'
description: 'Một câu tóm tắt — hiện trong danh sách, RSS và khi share link.'
date: 2026-11-10
updated: 2026-11-15     # tuỳ chọn
lang: vi                # en | vi
tags: ['css', 'ghi-chu']
draft: true             # đổi thành false khi muốn đăng
---

Nội dung viết bằng Markdown.
```

3. Thêm ảnh (nếu có): đặt ảnh cạnh bài hoặc trong `src/assets/blog/<slug>/`, rồi import:

```mdx
import shot from '../../assets/blog/my-post/shot-01.png';

<Figure src={shot} alt="Mô tả ảnh cho người đọc màn hình" caption="Chú thích hiện dưới ảnh" />
```

4. Ghi chú nổi bật:

```mdx
<Callout title="Mẹo">Nội dung ghi chú.</Callout>
```

5. Chạy `npm run dev` để xem, rồi commit và push. Site sẽ tự cập nhật sau 1–2 phút.

**Quy ước tag:** chữ thường, nối bằng `-`, dùng lại tag cũ nếu được. Các tag hiện có: `design-systems`, `css`,
`theming`, `figma`, `design-tokens`, `ghi-chu`.

---

## 5. Thêm case study

1. Đặt ảnh trong `src/assets/work/<slug>/`. Nên export từ Figma ở độ rộng 1920 px, định dạng PNG. Astro sẽ tự nén sang
   WebP.
2. Tạo `src/content/work/<slug>.mdx`:

```mdx
---
title: 'Tên dự án — một câu nói rõ giá trị'
summary: 'Hai câu: làm gì, cho ai, kết quả gì.'
role: 'UX research · UI design'
period: '2025'                  # hoặc 'UI/UX course project'
context: 'Mobile app · Healthcare'
tags: ['Mobile', 'UX Research']
cover: ../../assets/work/<slug>/cover.png   # tuỳ chọn
accent: '#135D9B'               # màu nền thẻ khi không có ảnh cover
order: 5                        # thứ tự hiển thị, nhỏ đứng trước
featured: false                 # true = hiện ở trang chủ (nên giữ tối đa 3)
draft: true
stats:
  - { value: '60+', label: 'screens' }
---

import cover from '../../assets/work/<slug>/cover.png';
```

**Khung nội dung nên theo** (chỉnh tuỳ dự án):

1. **Context** — dự án là gì, vai trò của mình, team bao nhiêu người.
2. **Problem** — vấn đề của người dùng hoặc của doanh nghiệp.
3. **Process** — research, persona, journey, flow, wireframe.
4. **Solution** — UI, design system, các quyết định quan trọng và lý do.
5. **Outcome** — con số, phản hồi, những gì đã ship.
6. **What I learned** — 2–3 ý.

---

## 6. Design tokens và style

Token nằm trong `src/styles/global.css`, chia hai lớp:

- **Primitive**: dải màu `teal-*`, `ink-*`, `coral-500`. Teal `#237378` và ink `#192D41` lấy từ màu của CV.
- **Semantic**: `bg`, `surface`, `fg`, `muted`, `line`, `accent`, `accent-fg`, `accent-soft`. Component **chỉ** dùng
  lớp này, ví dụ `bg-surface text-fg border-line`.

Dark mode chỉ khai báo lại các biến semantic trong `.dark { … }`. Muốn đổi màu thương hiệu, chỉ cần sửa `--accent` ở
`:root` và `.dark`.

**Class dùng chung:**

| Class | Dùng cho |
| --- | --- |
| `container-page` | Khung nội dung, rộng tối đa 5xl |
| `eyebrow` | Nhãn nhỏ viết hoa phía trên tiêu đề |
| `btn-primary`, `btn-ghost` | Nút |
| `card` | Khung có viền, bo góc |
| `tag` | Nhãn tag |
| `prose-page` | Vùng hiển thị nội dung bài viết |

Tailwind 4 không cho `@apply` một class tự định nghĩa (ví dụ `@apply btn`). Muốn dùng chung style, hãy gộp selector.

---

## 7. Thông tin cá nhân và menu

Sửa trong `src/site.ts`: tên, mô tả, email, GitHub, đường dẫn CV, menu. Nội dung trang About nằm trong
`src/pages/about.astro`.

**Cập nhật CV PDF:** sửa file docx, rồi xuất PDF đè lên `public/Nguyen_Ngoc_Thuy_CV.pdf` (giữ nguyên tên file).

---

## 8. Deploy

Lần đầu:

1. Tạo repo **public** tên `thuynn.github.io` trên GitHub.
2. Chạy:

```powershell
git remote add origin https://github.com/thuynn/thuynn.github.io.git
git push -u origin main
```

3. Vào **Settings → Pages → Source**, chọn **GitHub Actions**.

Các lần sau chỉ cần `git push`. Xem tiến trình ở tab **Actions**. Nếu build lỗi, chạy `npm run build` trên máy để xem
chi tiết.

---

## 9. Nguyên tắc bảo mật nội dung

- **Không** đăng màn hình, code hay dữ liệu của sản phẩm chính của Spectos (RTPM).
- **Không** nêu tên khách hàng (Audi, Vietjet, Royal Mail, bpost…).
- App làm cho công ty (ví dụ Scan & Sign) để `draft: true` cho đến khi được phép đăng, hoặc ẩn tên hay logo khách hàng.
- Số liệu nói về **quy mô công việc của mình** (số token, component, commit) thì được, vì không lộ nội dung sản phẩm.
- Dự án học ở MindX phải ghi rõ là **course project**.

---

## 10. Checklist trước khi push

- [ ] `npm run build` không lỗi
- [ ] Ảnh có `alt` mô tả đúng nội dung
- [ ] Bài mới đã đổi `draft: false`
- [ ] Không vi phạm mục 9
- [ ] Xem thử cả light mode lẫn dark mode, cả màn hình điện thoại

# Kế hoạch phát triển portfolio

Cập nhật: 06/11/2026

## Mục tiêu

1. **Portfolio**: nhà tuyển dụng hiểu được năng lực trong 2 phút. Mình vừa thiết kế UI/UX vừa tự code được, và đã giữ
   một design system thật suốt 12 năm.
2. **Show kỹ năng**: bản thân site là bằng chứng — code public trên GitHub, token, accessibility, dark mode, các công
   cụ trong Lab.
3. **Blog**: nơi lưu kinh nghiệm và những thứ mình tâm đắc. Đăng đều, không cần dài.

**Đối tượng đọc:** nhà tuyển dụng hoặc hiring manager (remote, nước ngoài), dev hoặc designer đồng nghiệp, và chính
mình sau này.

---

## Hiện trạng

| Hạng mục | Trạng thái |
| --- | --- |
| Khung site: Home, Work, Blog, Lab, About, RSS, 404, dark mode | ✅ Xong |
| Case study Spectos Design System (chỉ chữ, đã ẩn danh) | ✅ Xong — cần tự đọc lại |
| Case study Covigo (11 slide từ Figma) | ✅ Xong |
| Case study Alpha Design System + Token Explorer | ✅ Xong |
| Case study Scan & Sign | ⏸ Nháp — chưa có ảnh, chưa được phép đăng |
| 2 bài blog mẫu (EN + VI) | ✅ Xong — cần tự đọc lại |
| CV PDF, favicon, workflow deploy | ✅ Xong |
| Đưa lên GitHub Pages | ⬜ Chưa làm |

---

## Giai đoạn 1 — Launch (trước 08/11, hạn phỏng vấn micro1)

- [ ] Tạo repo `thuynn.github.io`, push code, bật Pages (xem `GUIDE.md` mục 8)
- [ ] Mở https://thuynn.github.io trên máy tính và điện thoại, bấm thử mọi link
- [ ] Đọc lại case study Spectos và bài blog tiếng Anh, sửa chỗ nào chưa đúng thực tế
- [ ] Bật "Include private contributions" trên profile GitHub
- [ ] Cập nhật link portfolio vào CV, LinkedIn và hồ sơ micro1

**Xong khi:** site chạy trên domain, không có link hỏng, nội dung đã tự kiểm tra.

---

## Giai đoạn 2 — Hoàn thiện nội dung (tuần 2–3 tháng 11)

**Case study**

- [ ] Hỏi Spectos có cho đăng Scan & Sign không. Nếu không, ẩn tên "NWS" và logo khách hàng
- [ ] Export màn hình Scan & Sign: 10 màn hi-fi + wireframe, rồi bỏ nháp
- [ ] Export slide 14 của Covigo nếu cần
- [ ] Thêm ảnh cover cho Spectos và Alpha (ảnh minh hoạ token, không chụp sản phẩm)

**Trang About**

- [ ] Thêm ảnh chân dung
- [ ] Thêm 2–3 câu về cách làm việc remote

**SEO và chia sẻ**

- [ ] Ảnh Open Graph (1200×630) cho trang chủ và từng case study
- [ ] Kiểm tra Lighthouse: Performance, Accessibility, Best Practices, SEO đều ≥ 95

---

## Giai đoạn 3 — Sắp xếp file Figma case study

Mục tiêu: file Figma đủ chuyên nghiệp để gửi link kèm portfolio.

Cấu trúc page đề xuất:

```text
📄 Cover                 Thumbnail của file + mục lục
📄 01 · Covigo           Slide case study · Flows · UI screens · Style guide
📄 02 · Scan & Sign      Wireframe · Hi-fi · Prototype (sau khi được phép)
📄 03 · Alpha Tokens     Foundations: Color, Spacing, Typography
📄 04 · Shopping         (dự án mới — xem giai đoạn 5)
📄 🗄 Archive            Bản nháp, phương án đã bỏ
```

Quy ước:

- Tên frame có thứ tự, ví dụ `Covigo / 03 · Persona`.
- Frame trình bày rộng 1920 px để export cho site.
- Mỗi page đều có một section "About this project": vai trò, thời gian, công cụ.

---

## Giai đoạn 4 — Blog (liên tục, tối thiểu 2 bài/tháng)

Danh sách đề tài, xếp theo thứ tự ưu tiên:

| # | Đề tài | Ngôn ngữ |
| --- | --- | --- |
| 1 | Dùng AI (Figma MCP + Cursor) để dựng lại Figma Variables — chỗ nào AI làm tốt, chỗ nào phải kiểm tra tay | VI |
| 2 | Tách 6,500 dòng SCSS mà không làm vỡ giao diện | EN |
| 3 | Từ CSS sinh lúc runtime sang CSS tĩnh — vì sao và làm thế nào | EN |
| 4 | Map token SCSS cũ sang Tailwind 4 `@theme` khi chuyển lên Angular 21 | EN |
| 5 | Làm Highcharts đẹp ở mọi độ phân giải và khi in | EN |
| 6 | Checklist review UI trên trình duyệt trước khi merge | VI |
| 7 | Học UI/UX sau 15 năm làm front-end: những điều thay đổi cách mình làm | VI |
| 8 | Làm việc remote khi tiếng Anh chưa giỏi: viết rõ, viết ngắn | VI |

Quy trình mỗi bài: viết nháp (`draft: true`), để 1 ngày, đọc lại, thêm ảnh hoặc code minh hoạ, rồi đăng.

---

## Giai đoạn 5 — Mở rộng (tháng 12 trở đi)

**Tính năng cho site**

| Tính năng | Lợi ích | Độ khó |
| --- | --- | --- |
| Tìm kiếm bài viết (Pagefind) | Tìm nhanh khi có nhiều bài | Thấp |
| View Transitions | Chuyển trang mượt hơn | Thấp |
| Thống kê lượt xem (GoatCounter, không dùng cookie) | Biết bài nào được đọc | Thấp |
| Bình luận qua GitHub Discussions (giscus) | Người đọc trao đổi được | Thấp |
| Lọc blog theo ngôn ngữ EN/VI | Người đọc chọn được ngôn ngữ | Trung bình |
| Tự sinh ảnh OG cho từng bài | Share đẹp mà không phải làm tay | Trung bình |

**Thêm công cụ vào Lab** (mỗi công cụ là một bài show kỹ năng)

- Type scale generator: chọn tỉ lệ, xem trước và copy CSS
- Spacing / grid visualizer
- Theme builder: chọn màu thương hiệu, tự tạo dải màu và kiểm tra tương phản
- Demo theme Highcharts dùng token

**Case study mới**

- Dự án "Shopping": page Figma đang trống. Làm trọn từ research đến UI, rồi code luôn một màn hình demo trong Lab để
  thể hiện được cả design lẫn code.

---

## Bảo trì định kỳ

| Tần suất | Việc |
| --- | --- |
| Mỗi tháng | Cập nhật thư viện (`npm outdated`, `npm update`), chạy build thử |
| Mỗi quý | Chạy lại Lighthouse, đọc lại các case study, cập nhật số liệu |
| Khi đổi việc hoặc có dự án mới | Cập nhật About, CV PDF, thêm case study |

---

## Cách đo hiệu quả

- Lighthouse ≥ 95 ở cả 4 mục
- Blog: ≥ 2 bài/tháng
- Phản hồi từ nhà tuyển dụng có nhắc đến portfolio hoặc case study
- GitHub có commit đều đặn (repo này là public)

# IT3160 — Luyện trắc nghiệm Nhập môn Trí tuệ nhân tạo

Web app luyện trắc nghiệm mobile-first cho môn IT3160, gồm **516 câu hỏi** chia theo 7 bài đã học: **L1–L6 và L8**, kèm **7 bộ đề 30 câu** (5 đề giữa kỳ + 2 đề nâng cao).

## Tính năng

- **Luyện theo bài**: chọn từng bài (L1, L2, L3, L4, L5, L6, L8) và làm toàn bộ câu của bài đó.
- **Đề giữa kỳ**: 5 bộ đề 30 câu theo đúng cấu trúc đề thi thật (45 phút, giữ nguyên thứ tự câu và đáp án) — gồm đề gốc 104 và 4 đề luyện biến thể.
- **Đề nâng cao**: 2 bộ đề 30 câu khó hơn, chia 2 phần A/B, có câu chọn 2 đáp án và bài toán tính toán (UCS/A*, Minimax, CNF, IDS, GA, CSP) kèm hình vẽ.
- **Hình vẽ trong câu hỏi**: các câu về cây tìm kiếm và cây Minimax hiển thị hình vẽ SVG (cấu trúc cây, giá trị heuristic, chi phí cạnh) ngay dưới câu hỏi.
- **Luyện nhanh 10 câu**: trộn đều các bài, ưu tiên câu chưa làm.
- **Thi thử 20 câu**: có đồng hồ đếm ngược 20 phút, chỉ chấm điểm khi nộp bài.
- **Ôn câu sai** và **câu đã đánh dấu**.
- **Phím tắt**: bấm `1`–`5` (hoặc `A`–`E`) để chọn đáp án, `Enter` để kiểm tra / sang câu tiếp.
- **Lý thuyết trọng tâm**: tóm tắt chi tiết 7 bài, bảng so sánh, công thức và ví dụ.
- Phản hồi ngay sau mỗi câu, kèm **giải thích đáp án**; cuối phiên có bảng điểm, độ chính xác theo bài và danh sách câu cần xem lại.
- Theo dõi tiến độ: số câu đã làm, độ chính xác, lịch sử các phiên.
- Giao diện sáng/tối theo hệ thống, xáo trộn câu hỏi và đáp án.
- Không dùng thư viện ngoài — chỉ HTML, CSS và JavaScript thuần.

## Cấu trúc

```
index.html      giao diện
style.css       giao diện
app.js          logic luyện tập, lưu tiến độ bằng localStorage
data/l1.js      ngân hàng câu hỏi theo bài
...
data/l1b.js … data/l8b.js   các câu bổ sung theo bài
data/gk104.js   đề giữa kỳ gốc (mã 104) — 30 câu
data/gk101.js … data/gk105.js   4 đề luyện biến thể — 30 câu/đề
data/gk106.js, data/gk107.js    2 đề nâng cao — 30 câu/đề, 2 phần
```

Số câu mỗi bài: L1 60 · L2 72 · L3 80 · L4 95 · L5 45 · L6 40 · L8 124 (tổng 516, gồm 210 câu trong 7 bộ đề).

## Chạy local

```bash
python3 -m http.server 8000
# mở http://localhost:8000
```

Hoặc mở trực tiếp `index.html` trong trình duyệt.

## Nguồn câu hỏi

- **134 câu** lấy từ file đề cương/tóm tắt ôn tập của môn (Chương 1, Chương 2, Chương 3 — tìm kiếm cơ bản, tìm kiếm có tri thức bổ sung, tìm kiếm đối kháng, thỏa mãn ràng buộc). Đáp án và giải thích được biên soạn cho bản web này.
- **172 câu** soạn mới: 62 câu cho **L8 – Biểu diễn tri thức** (luật sản xuất, khung, mạng ngữ nghĩa, ontology) và 110 câu bổ sung, vận dụng cho L1–L6.
- **30 câu** chép lại từ đề giữa kỳ 2025.2 mã đề 104 (lớp 166157), giữ nguyên thứ tự đáp án như đề in.
- **120 câu** soạn mới theo đúng cấu trúc đề gốc (4 đề × 30 câu), thay đổi tình huống, số liệu và vị trí đáp án.
- **60 câu** nâng cao (2 đề × 30 câu): câu hỏi tình huống, câu chọn 2 đáp án, bài toán tính toán có hình vẽ.

Nếu thấy câu nào chưa khớp với bài giảng, cứ sửa trực tiếp trong `data/*.js` — mỗi câu là một object:

```js
{ id: "l3-01", t: "l3", type: "single",
  q: "Câu hỏi", o: ["A", "B", "C", "D"], a: [1], e: "Giải thích" }
```

`type: "multi"` kèm `pick: 2` cho câu chọn nhiều đáp án; `a` là mảng chỉ số đáp án đúng (bắt đầu từ 0).

## Ghi chú

- Tiến độ lưu trên trình duyệt (localStorage), không đồng bộ giữa các thiết bị.
- Chưa bao gồm **L7 – Chương 4 (Tri thức và suy diễn)**.

# IT3160 — Luyện trắc nghiệm Nhập môn Trí tuệ nhân tạo

Web app luyện trắc nghiệm mobile-first cho môn IT3160, gồm **456 câu hỏi** chia theo 7 bài đã học: **L1–L6 và L8**, kèm **5 đề giữa kỳ 30 câu**.

## Tính năng

- **Luyện theo bài**: chọn từng bài (L1, L2, L3, L4, L5, L6, L8) và làm toàn bộ câu của bài đó.
- **Đề giữa kỳ**: 5 bộ đề 30 câu theo đúng cấu trúc đề thi thật (45 phút, giữ nguyên thứ tự câu và đáp án) — gồm đề gốc 104 và 4 đề luyện biến thể.
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
```

Số câu mỗi bài: L1 55 · L2 67 · L3 69 · L4 82 · L5 35 · L6 36 · L8 112 (tổng 456, gồm 150 câu trong các đề giữa kỳ).

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

Nếu thấy câu nào chưa khớp với bài giảng, cứ sửa trực tiếp trong `data/*.js` — mỗi câu là một object:

```js
{ id: "l3-01", t: "l3", type: "single",
  q: "Câu hỏi", o: ["A", "B", "C", "D"], a: [1], e: "Giải thích" }
```

`type: "multi"` kèm `pick: 2` cho câu chọn nhiều đáp án; `a` là mảng chỉ số đáp án đúng (bắt đầu từ 0).

## Ghi chú

- Tiến độ lưu trên trình duyệt (localStorage), không đồng bộ giữa các thiết bị.
- Chưa bao gồm **L7 – Chương 4 (Tri thức và suy diễn)**.

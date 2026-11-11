# IT3160 — Luyện trắc nghiệm Nhập môn Trí tuệ nhân tạo

Web app luyện trắc nghiệm mobile-first cho môn IT3160, gồm **306 câu hỏi** chia theo 7 bài đã học: **L1–L6 và L8**.

## Tính năng

- **Luyện theo bài**: chọn từng bài (L1, L2, L3, L4, L5, L6, L8) và làm toàn bộ câu của bài đó.
- **Luyện nhanh 10 câu**: trộn đều các bài, ưu tiên câu chưa làm.
- **Thi thử 20 câu**: có đồng hồ đếm ngược 20 phút, chỉ chấm điểm khi nộp bài.
- **Ôn câu sai** và **câu đã đánh dấu**.
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
```

Số câu mỗi bài: L1 45 · L2 47 · L3 49 · L4 42 · L5 25 · L6 36 · L8 62.

## Chạy local

```bash
python3 -m http.server 8000
# mở http://localhost:8000
```

Hoặc mở trực tiếp `index.html` trong trình duyệt.

## Nguồn câu hỏi

- **134 câu** lấy từ file đề cương/tóm tắt ôn tập của môn (Chương 1, Chương 2, Chương 3 — tìm kiếm cơ bản, tìm kiếm có tri thức bổ sung, tìm kiếm đối kháng, thỏa mãn ràng buộc). Đáp án và giải thích được biên soạn cho bản web này.
- **172 câu** soạn mới: 62 câu cho **L8 – Biểu diễn tri thức** (luật sản xuất, khung, mạng ngữ nghĩa, ontology) và 110 câu bổ sung, vận dụng cho L1–L6.

Nếu thấy câu nào chưa khớp với bài giảng, cứ sửa trực tiếp trong `data/*.js` — mỗi câu là một object:

```js
{ id: "l3-01", t: "l3", type: "single",
  q: "Câu hỏi", o: ["A", "B", "C", "D"], a: [1], e: "Giải thích" }
```

`type: "multi"` kèm `pick: 2` cho câu chọn nhiều đáp án; `a` là mảng chỉ số đáp án đúng (bắt đầu từ 0).

## Ghi chú

- Tiến độ lưu trên trình duyệt (localStorage), không đồng bộ giữa các thiết bị.
- Chưa bao gồm **L7 – Chương 4 (Tri thức và suy diễn)**.

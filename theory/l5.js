window.THEORY = window.THEORY || [];
window.THEORY.push({
  id: "l5", code: "L5", title: "Tìm kiếm có đối thủ",
  sub: "Cây trò chơi · Minimax · cắt tỉa Alpha–Beta",
  body: `
<h3>1. Bài toán tìm kiếm có đối thủ</h3>
<p>Các thuật toán như IDS, A* phù hợp với bài toán chỉ có <em>một</em> tác tử. Khi có <strong>hai tác tử với mục tiêu đối nghịch</strong>, cần <strong>tìm kiếm có đối thủ (adversarial search)</strong> — rất phổ biến trong trò chơi.</p>
<p>Khó khăn chính:</p>
<ul>
<li>Không dự đoán trước được phản ứng của đối thủ → phải xét một nước đi phù hợp cho mỗi phản ứng có thể.</li>
<li>Giới hạn thời gian (trò chơi tính giờ) → thường không thể tìm giải pháp tối ưu, phải xấp xỉ.</li>
<li>Cần cân bằng giữa chất lượng nước đi và chi phí tính toán.</li>
</ul>
<p>Giả thiết của trò chơi đối kháng điển hình: <strong>hai người chơi luân phiên</strong>, <strong>xác định</strong>, <strong>thông tin đầy đủ</strong>, <strong>tổng bằng 0</strong> (zero-sum): mức thắng của người này bằng mức thua của người kia.</p>

<h3>2. Biểu diễn bài toán trò chơi</h3>
<ul>
<li><strong>Trạng thái bắt đầu:</strong> trạng thái trò chơi + người chơi đi trước.</li>
<li><strong>Hàm chuyển trạng thái (successor function):</strong> trả về các cặp (nước đi, trạng thái mới) hợp lệ.</li>
<li><strong>Kiểm tra kết thúc (terminal test):</strong> xác định trò chơi đã kết thúc chưa.</li>
<li><strong>Hàm tiện ích (utility function):</strong> gán điểm tại trạng thái kết thúc (lá), thể hiện kết quả đối với người chơi.</li>
</ul>
<p>Trạng thái bắt đầu + các nước đi hợp lệ tạo nên <strong>cây biểu diễn trò chơi (game tree)</strong>. Ví dụ: cờ ca-rô (Tic-Tac-Toe) — trò chơi đối kháng hai người, đi luân phiên X/O, thắng khi có ba dấu thẳng hàng.</p>

<h3>3. Giải thuật Minimax</h3>
<p>Hai người chơi: <strong>MAX</strong> muốn cực đại hóa utility, <strong>MIN</strong> muốn cực tiểu hóa utility của MAX. Giả định cả hai đều chơi tối ưu.</p>
<ul>
<li>Giá trị Minimax tại một nút: nếu là nút MAX → lấy <em>max</em> giá trị các con; nếu là nút MIN → lấy <em>min</em> giá trị các con.</li>
<li>Tính đệ quy từ các nút lá lên gốc; MAX chọn nước đi ứng với giá trị Minimax cực đại.</li>
<li><strong>Ví dụ:</strong> gốc MAX có hai con MIN; MIN thứ nhất có lá 3, 5 → 3; MIN thứ hai có lá 2, 9 → 2; MAX(3, 2) = 3. Nước đi tối ưu là nhánh thứ nhất.</li>
</ul>
<div class="table-wrap"><table>
<thead><tr><th>Tiêu chí</th><th>Minimax</th></tr></thead>
<tbody>
<tr><td>Hoàn chỉnh</td><td>Có, nếu cây trò chơi hữu hạn.</td></tr>
<tr><td>Tối ưu</td><td>Có, với giả định đối thủ cũng chơi tối ưu.</td></tr>
<tr><td>Thời gian</td><td>O(b<sup>m</sup>).</td></tr>
<tr><td>Bộ nhớ</td><td>O(bm) — duyệt theo chiều sâu.</td></tr>
</tbody></table></div>
<p><strong>Hạn chế:</strong> với cờ vua, b ≈ 35 và m ≈ 100, chi phí O(b<sup>m</sup>) là quá lớn — không thể duyệt chính xác toàn bộ cây để tìm nước đi tối ưu.</p>

<h3>4. Cắt tỉa Alpha–Beta</h3>
<p><strong>Ý tưởng:</strong> nếu một nhánh không thể cải thiện giá trị đã có, không cần xét tiếp nhánh đó. Việc cắt tỉa các nhánh "tồi" <em>không làm thay đổi kết quả cuối cùng</em> của Minimax.</p>
<ul>
<li><strong>α (alpha):</strong> giá trị tốt nhất (cao nhất) của MAX tính đến hiện tại trên nhánh đang xét — cận dưới.</li>
<li><strong>β (beta):</strong> giá trị tốt nhất (thấp nhất) của MIN tính đến hiện tại — cận trên.</li>
<li><strong>Điều kiện cắt:</strong> khi <code>α ≥ β</code>, nhánh hiện tại không còn khả năng ảnh hưởng tới quyết định ở trên, nên bỏ qua phần còn lại.</li>
<li><strong>Kết quả:</strong> giống hệt Minimax nếu cài đặt đúng.</li>
<li><strong>Độ phức tạp:</strong> trường hợp xấu vẫn O(b<sup>m</sup>); nếu thứ tự nước đi được sắp xếp tối ưu, còn O(b<sup>m/2</sup>) — cho phép tìm kiếm sâu gấp đôi trong cùng thời gian.</li>
</ul>
<p><strong>Ví dụ (cờ ca-rô):</strong> duyệt các nước đi từ trái sang phải; khi gặp một giá trị đủ tốt cho MAX (hoặc đủ tệ cho MIN), các nhánh còn lại của nút MIN (hoặc MAX) bị cắt. Cần xét thứ tự nước đi để cắt được nhiều nhất.</p>

<h3>5. Với trò chơi lớn</h3>
<ul>
<li>Alpha–Beta vẫn không đủ với không gian trạng thái khổng lồ (cờ vua, cờ vây).</li>
<li>Cần <strong>hàm đánh giá heuristic</strong> cho trạng thái trung gian (tương tự h(n) trong A*) để ước lượng giá trị thế cờ.</li>
<li>Kết hợp <strong>giới hạn độ sâu tìm kiếm</strong>, mở rộng có chọn lọc, hoặc các phương pháp học máy (như AlphaGo dùng mạng nơ-ron + MCTS).</li>
<li>Nguyên tắc: chất lượng đánh giá + độ sâu hợp lý quan trọng hơn việc duyệt vét cạn.</li>
</ul>
<p><strong>Tóm lại:</strong> Minimax cho chiến lược tối ưu trên cây hữu hạn; Alpha–Beta tăng tốc bằng cách bỏ nhánh vô ích; với trò chơi thực tế, cần thêm heuristic và giới hạn tài nguyên.</p>
`
});

window.THEORY = window.THEORY || [];
window.THEORY.push({
  id: "l3", code: "L3", title: "Giải quyết vấn đề bằng tìm kiếm cơ bản",
  sub: "Bài toán trạng thái · cây tìm kiếm · BFS · UCS · DFS · DLS · IDS",
  body: `
<h3>1. Tác tử giải quyết vấn đề</h3>
<p>Tác tử giải quyết vấn đề vận hành theo chu trình 4 bước:</p>
<ol>
<li><strong>Xác định mục tiêu (goal formulation):</strong> xác định tập trạng thái đích dựa trên trạng thái hiện tại và đánh giá hiệu quả hành động.</li>
<li><strong>Phát biểu bài toán (problem formulation):</strong> xác định các trạng thái và hành động cần xem xét.</li>
<li><strong>Tìm kiếm (search):</strong> khảo sát các chuỗi hành động có thể, chọn chuỗi tốt nhất; kết quả lưu vào <code>seq</code>.</li>
<li><strong>Thực thi (execution):</strong> thực hiện lần lượt các hành động trong <code>seq</code> cho đến khi xong (seq rỗng).</li>
</ol>
<p><strong>Phân biệt với Information Retrieval:</strong> tìm kiếm trong AI sinh ra và đánh giá <em>chuỗi hành động biến đổi trạng thái</em>, kết quả là đường đi/lời giải; tìm kiếm trên Google/Bing là tra cứu tài liệu, kết quả là danh sách văn bản/dữ liệu.</p>

<h3>2. Phát biểu bài toán trạng thái đơn</h3>
<p>Bài toán trạng thái đơn xuất hiện khi môi trường <strong>xác định</strong> và <strong>quan sát được hoàn toàn</strong>. Bài toán được định nghĩa bởi 4 thành phần:</p>
<ul>
<li><strong>Trạng thái đầu (initial state):</strong> ví dụ "đang ở Arad".</li>
<li><strong>Hàm chuyển trạng thái (transition model):</strong> <code>Result(s, a) → s'</code>; tập các cặp <em>&lt;hành động, trạng thái kế tiếp&gt;</em>.</li>
<li><strong>Kiểm tra mục tiêu (goal test):</strong> trực tiếp (x = "Bucharest") hoặc gián tiếp (Sạch(x), HếtCờ(x)…).</li>
<li><strong>Chi phí đường đi (path cost):</strong> tổng chi phí các bước; <code>c(x,a,y) ≥ 0</code> là chi phí bước từ x sang y bằng hành động a.</li>
</ul>
<p><strong>Lời giải (solution)</strong> là chuỗi hành động dẫn từ trạng thái đầu đến trạng thái thỏa mãn goal test. <strong>Lời giải tối ưu</strong> là lời giải có chi phí đường đi nhỏ nhất.</p>
<p><strong>Ví dụ Romania:</strong> đi từ Arad đến Bucharest; trạng thái = thành phố, hành động = lái xe giữa các thành phố, lời giải = Arad → Sibiu → Fagaras → Bucharest.</p>

<h3>3. Các kiểu bài toán</h3>
<div class="table-wrap"><table>
<thead><tr><th>Kiểu bài toán</th><th>Đặc điểm</th><th>Dạng lời giải</th></tr></thead>
<tbody>
<tr><td><strong>Trạng thái đơn</strong></td><td>Xác định, quan sát đầy đủ; biết chính xác trạng thái và kết quả hành động.</td><td>Chuỗi hành động cố định, tìm kiếm offline trước khi thực thi.</td></tr>
<tr><td><strong>Thiếu cảm nhận (sensorless)</strong></td><td>Không quan sát được; tác tử không biết mình đang ở trạng thái nào.</td><td>Chuỗi hành động cố định (kế hoạch mù) để đạt đích từ mọi trạng thái khả dĩ.</td></tr>
<tr><td><strong>Có sự kiện ngẫu nhiên (contingency)</strong></td><td>Không xác định và/hoặc quan sát một phần; nhận thức cung cấp thông tin mới khi thực thi.</td><td>Kế hoạch dạng chính sách (policy) có điều kiện rẽ nhánh; tìm kiếm xen kẽ thực thi.</td></tr>
<tr><td><strong>Thăm dò (exploration)</strong></td><td>Không biết không gian trạng thái.</td><td>Vừa khám phá vừa hành động (online search).</td></tr>
</tbody></table></div>
<p><strong>Ví dụ máy hút bụi:</strong> trạng thái đơn — bắt đầu #5, lời giải [Sang phải, Hút bụi]; thiếu cảm nhận — bắt đầu có thể ở một trong 8 trạng thái, lời giải [Sang phải, Hút bụi, Sang trái, Hút bụi]; có sự kiện ngẫu nhiên — lời giải dạng [Sang phải, nếu Bẩn thì Hút bụi].</p>

<h3>4. Khái quát hóa và cây tìm kiếm</h3>
<ul>
<li><strong>Abstraction:</strong> loại bỏ chi tiết thực tế không ảnh hưởng trực tiếp đến lời giải. Trạng thái khái quát đại diện một tập trạng thái thực tế; hành động khái quát đại diện một kết hợp hành động thực tế. Yêu cầu: mọi trạng thái thực vẫn phải liên thông được qua các hành động khái quát.</li>
<li><strong>Đồ thị không gian trạng thái → cây tìm kiếm:</strong> thay mỗi cạnh vô hướng bằng hai cung có hướng; loại bỏ chu trình để tránh duyệt lặp trạng thái trên cùng một nhánh.</li>
<li><strong>Trạng thái (state)</strong> là biểu diễn hình trạng thực tế; <strong>nút (node)</strong> là cấu trúc dữ liệu của cây tìm kiếm, chứa: trạng thái, nút cha, hành động, độ sâu, chi phí đường đi <code>g(x)</code>. Một trạng thái thực có thể xuất hiện ở nhiều nút nếu có nhiều đường đi tới nó.</li>
<li><strong>Fringe/frontier:</strong> tập các nút đã sinh nhưng chưa được chọn mở rộng. <strong>Closed/explored:</strong> các nút đã mở rộng, dùng để tránh lặp.</li>
<li><strong>Expand(n):</strong> dùng <code>Successor-Fn</code> sinh các trạng thái kế tiếp, tạo nút con, gán thuộc tính (cha, hành động, độ sâu, g) và thêm vào fringe.</li>
</ul>

<h3>5. Đánh giá chiến lược tìm kiếm</h3>
<ul>
<li><strong>Tính hoàn chỉnh:</strong> có chắc tìm được lời giải nếu lời giải tồn tại?</li>
<li><strong>Độ phức tạp thời gian:</strong> số nút được sinh ra.</li>
<li><strong>Độ phức tạp bộ nhớ:</strong> số nút tối đa lưu đồng thời.</li>
<li><strong>Tính tối ưu:</strong> có tìm được lời giải chi phí thấp nhất?</li>
</ul>
<p>Ba tham số: <strong>b</strong> — hệ số phân nhánh tối đa; <strong>d</strong> — độ sâu của lời giải có chi phí thấp nhất; <strong>m</strong> — độ sâu tối đa của cây (có thể ∞).</p>

<h3>6. Tìm kiếm theo chiều rộng — BFS</h3>
<ul>
<li><strong>Ý tưởng:</strong> mở rộng nút nông nhất trước; duyệt theo độ sâu tăng dần. Fringe dùng <strong>hàng đợi FIFO</strong>: thêm nút mới vào cuối, lấy nút ở đầu.</li>
<li><strong>Giải thuật:</strong> lấy nút đầu fringe; nếu là đích → trả lời; nếu không, thêm các con vào cuối fringe; lặp đến khi fringe rỗng.</li>
<li><strong>Tính hoàn chỉnh:</strong> có, nếu b hữu hạn.</li>
<li><strong>Thời gian:</strong> <code>1 + b + b² + … + b^d = O(b^{d+1})</code>.</li>
<li><strong>Bộ nhớ:</strong> <code>O(b^{d+1})</code> — lưu toàn bộ các nút trong bộ nhớ; đây là hạn chế lớn nhất.</li>
<li><strong>Tối ưu:</strong> có, nếu chi phí mỗi bước bằng nhau (thường bằng 1).</li>
</ul>

<h3>7. Tìm kiếm với chi phí cực tiểu — UCS</h3>
<ul>
<li><strong>Ý tưởng:</strong> luôn mở rộng nút chưa xét có chi phí đường đi <code>g(n)</code> nhỏ nhất. Fringe là <strong>hàng đợi ưu tiên</strong> sắp xếp theo g(n).</li>
<li><strong>Tính hoàn chỉnh:</strong> có, nếu mọi chi phí bước ≥ ε &gt; 0.</li>
<li><strong>Thời gian/bộ nhớ:</strong> <code>O(b^{C*/ε})</code>, với C* là chi phí lời giải tối ưu — phụ thuộc vào số nút có chi phí ≤ C*.</li>
<li><strong>Tối ưu:</strong> có, vì các nút được xét theo g(n) tăng dần; khi một đích được lấy ra, không còn đường rẻ hơn.</li>
<li><strong>Liên hệ:</strong> nếu mọi chi phí bước bằng nhau, UCS trở thành BFS. <strong>Dijkstra</strong> là trường hợp riêng của UCS nhưng tìm đường ngắn nhất từ gốc tới <em>tất cả</em> các nút thay vì dừng ở đích đầu tiên.</li>
</ul>

<h3>8. Tìm kiếm theo chiều sâu — DFS</h3>
<ul>
<li><strong>Ý tưởng:</strong> mở rộng nút sâu nhất trước, đi liên tục theo một nhánh đến lá rồi quay lui. Fringe dùng <strong>ngăn xếp LIFO</strong> hoặc đệ quy.</li>
<li><strong>Tính hoàn chỉnh:</strong> không, nếu có nhánh độ sâu vô hạn; hoàn chỉnh với không gian hữu hạn.</li>
<li><strong>Thời gian:</strong> <code>O(b^m)</code> — rất lớn nếu m ≫ d.</li>
<li><strong>Bộ nhớ:</strong> <code>O(bm)</code> — tuyến tính, tiết kiệm hơn BFS rất nhiều.</li>
<li><strong>Tối ưu:</strong> không.</li>
</ul>

<h3>9. Tìm kiếm giới hạn độ sâu — DLS</h3>
<ul>
<li>Là DFS có thêm giới hạn độ sâu <code>l</code>: nút ở độ sâu l không có nút con (bị cắt).</li>
<li>Thời gian/bộ nhớ: <code>O(b^l)</code>. Không hoàn chỉnh, không tối ưu.</li>
<li><strong>Cut-off:</strong> nếu mọi đích nằm ở độ sâu d &gt; l, DLS báo thất bại dù lời giải tồn tại.</li>
</ul>

<h3>10. Tìm kiếm sâu dần — IDS</h3>
<ul>
<li>Chạy DLS lặp lại với <code>l = 0, 1, 2, …</code> cho đến khi tìm được lời giải hoặc duyệt hết cây.</li>
<li><strong>Hoàn chỉnh:</strong> có. <strong>Tối ưu:</strong> có nếu chi phí bước đồng nhất.</li>
<li><strong>Thời gian:</strong> <code>(d+1)b⁰ + d·b¹ + (d−1)b² + … + b^d = O(b^{d+1})</code>.</li>
<li><strong>Bộ nhớ:</strong> <code>O(bd)</code> — tuyến tính như DFS.</li>
<li><strong>Chi phí sinh lại:</strong> các tầng nông bị sinh lại nhiều lần nhưng phần lớn nút nằm ở tầng đáy, nên lãng phí nhỏ: với b = 10, d = 5, DLS sinh 111.111 nút, IDS sinh 123.456 nút — thêm khoảng 11%.</li>
</ul>

<h3>11. Bảng so sánh 5 giải thuật</h3>
<div class="table-wrap wide"><table>
<thead><tr><th>Tiêu chí</th><th>BFS</th><th>UCS</th><th>DFS</th><th>DLS</th><th>IDS</th></tr></thead>
<tbody>
<tr><td>Hoàn chỉnh</td><td>Có (b hữu hạn)</td><td>Có (chi phí ≥ ε)</td><td>Không</td><td>Không</td><td>Có</td></tr>
<tr><td>Thời gian</td><td>O(b<sup>d+1</sup>)</td><td>O(b<sup>C*/ε</sup>)</td><td>O(b<sup>m</sup>)</td><td>O(b<sup>l</sup>)</td><td>O(b<sup>d+1</sup>)</td></tr>
<tr><td>Bộ nhớ</td><td>O(b<sup>d+1</sup>)</td><td>O(b<sup>C*/ε</sup>)</td><td>O(bm)</td><td>O(bl)</td><td>O(bd)</td></tr>
<tr><td>Tối ưu</td><td>Có (chi phí = 1)</td><td>Có</td><td>Không</td><td>Không</td><td>Có (chi phí = 1)</td></tr>
</tbody></table></div>
<p><strong>Kết luận:</strong> BFS/UCS mạnh về tính đầy đủ/tối ưu nhưng tốn bộ nhớ hàm mũ; DFS/DLS tiết kiệm bộ nhớ nhưng không hoàn chỉnh/tối ưu. <strong>IDS</strong> là lựa chọn cân bằng nhất trong các chiến lược tìm kiếm mù: hoàn chỉnh, tối ưu khi chi phí đồng nhất, bộ nhớ tuyến tính.</p>
`
});

window.THEORY = window.THEORY || [];
window.THEORY.push({
  id: "l4", code: "L4", title: "Tìm kiếm với tri thức bổ sung",
  sub: "Heuristic · Greedy · A* · admissible/consistent · tìm kiếm cục bộ · GA",
  body: `
<h3>1. Vì sao cần tìm kiếm có thông tin?</h3>
<p>Các chiến lược tìm kiếm mù chỉ dùng thông tin trong định nghĩa bài toán, nên với bài toán thực tế thường đòi hỏi chi phí thời gian và bộ nhớ quá cao. <strong>Tìm kiếm có tri thức bổ sung (informed search)</strong> dùng thêm tri thức/kinh nghiệm của miền bài toán để định hướng quá trình tìm kiếm, giảm đáng kể số trạng thái cần khảo sát.</p>
<p><strong>Hàm heuristic h(n)</strong> ước lượng chi phí từ nút n đến đích:</p>
<ul>
<li><code>h(n) ≥ 0</code> với mọi n; <code>h(đích) = 0</code>.</li>
<li>Ví dụ: khoảng cách đường chim bay <code>h_SLD(n)</code> từ thành phố n đến Bucharest — luôn nhỏ hơn hoặc bằng khoảng cách đường bộ thực tế.</li>
</ul>

<h3>2. Best-first search</h3>
<p>Dùng hàm đánh giá <code>f(n)</code> để đo mức độ "phù hợp" của mỗi nút. Fringe là hàng đợi ưu tiên, luôn chọn nút có f(n) tốt nhất. Các trường hợp đặc biệt:</p>
<ul>
<li><strong>Greedy best-first:</strong> <code>f(n) = h(n)</code>.</li>
<li><strong>A*:</strong> <code>f(n) = g(n) + h(n)</code>.</li>
</ul>

<h3>3. Greedy best-first search</h3>
<ul>
<li><strong>Ý tưởng:</strong> luôn mở rộng nút "có vẻ" gần đích nhất theo h(n).</li>
<li><strong>Ví dụ:</strong> Arad → Bucharest dùng hSLD; greedy có thể chọn Fagaras vì h nhỏ hơn, dù đường thực tế qua Fagaras dài hơn đường qua Vilcea.</li>
<li><strong>Hoàn chỉnh:</strong> không — có thể mắc vòng lặp (Neamt → Iasi → Neamt → …) nếu không có cơ chế tránh lặp.</li>
<li><strong>Thời gian/bộ nhớ:</strong> O(b<sup>m</sup>) trong trường hợp xấu; heuristic tốt cải thiện rất nhiều.</li>
<li><strong>Tối ưu:</strong> không, vì bỏ qua g(n) — tổng chi phí đã đi.</li>
</ul>

<h3>4. A* search</h3>
<p><strong>Ý tưởng:</strong> tránh mở rộng các nhánh đã biết là chi phí cao, bằng cách kết hợp chi phí thực đã đi và chi phí ước lượng còn lại.</p>
<p><code>f(n) = g(n) + h(n)</code>, trong đó:</p>
<ul>
<li><code>g(n)</code> = chi phí thực từ nút gốc đến nút n.</li>
<li><code>h(n)</code> = chi phí ước lượng từ n đến đích.</li>
<li><code>f(n)</code> = chi phí tổng thể ước lượng của đường đi qua n.</li>
</ul>
<div class="table-wrap"><table>
<thead><tr><th>Điều kiện của h</th><th>Hệ quả với A*</th></tr></thead>
<tbody>
<tr><td><strong>Chấp nhận được (admissible):</strong> <code>0 ≤ h(n) ≤ h*(n)</code> với mọi n, tức không bao giờ đánh giá cao hơn chi phí thực.</td><td>A* dạng <strong>TREE-SEARCH</strong> tối ưu.</td></tr>
<tr><td><strong>Kiên định (consistent):</strong> <code>h(n) ≤ c(n,a,n') + h(n')</code> với mọi nút n và nút kế tiếp n'.</td><td>A* dạng <strong>GRAPH-SEARCH</strong> tối ưu; f(n) không giảm dọc đường đi.</td></tr>
</tbody></table></div>
<p><strong>Chứng minh tối ưu (tóm tắt):</strong> giả sử A* chọn một đích không tối ưu G2 trước đích tối ưu G. Gọi n là nút trên đường đi tối ưu còn trong fringe. Vì h admissible: <code>f(n) = g(n) + h(n) ≤ g(n) + h*(n) = f(G)</code>. Vì G2 không tối ưu: <code>f(G2) = g(G2) &gt; g(G) = f(G)</code>. Suy ra <code>f(G2) &gt; f(G) ≥ f(n)</code>, mâu thuẫn với việc A* chọn G2 trước n. Do đó A* không thể bỏ qua lời giải tối ưu.</p>
<ul>
<li><strong>Tính hoàn chỉnh:</strong> có, nếu không gian trạng thái hữu hạn và có cơ chế tránh lặp trạng thái; không hoàn chỉnh với không gian vô hạn.</li>
<li><strong>Thời gian:</strong> hàm mũ — số nút xét là hàm mũ của độ dài lời giải.</li>
<li><strong>Bộ nhớ:</strong> lưu tất cả các nút trong bộ nhớ — hạn chế lớn giống BFS/UCS.</li>
<li><strong>A* vs UCS:</strong> UCS loang theo mọi hướng dựa trên g(n); A* phát triển chủ yếu về phía đích nhờ h(n) nhưng vẫn đảm bảo tối ưu khi h admissible.</li>
</ul>

<h3>5. Ước lượng chấp nhận được và ưu thế</h3>
<ul>
<li><strong>Ví dụ 8-puzzle:</strong> <code>h1(n)</code> = số ô nằm sai vị trí; <code>h2(n)</code> = tổng khoảng cách Manhattan của các ô sai vị trí. Cả hai đều admissible.</li>
<li><strong>Ưu thế (dominate):</strong> h2 trội hơn h1 nếu <code>h*(n) ≥ h2(n) ≥ h1(n)</code> với mọi n. Khi đó A* dùng h2 mở rộng ít nút hơn và tìm lời giải nhanh hơn.</li>
</ul>
<div class="table-wrap"><table>
<thead><tr><th>Độ sâu d</th><th>IDS</th><th>A* với h1</th><th>A* với h2</th></tr></thead>
<tbody>
<tr><td>12</td><td>3.644.035 nút</td><td>227 nút</td><td>73 nút</td></tr>
<tr><td>24</td><td>quá nhiều</td><td>39.135 nút</td><td>1.641 nút</td></tr>
</tbody></table></div>

<h3>6. Tìm kiếm cục bộ (local search)</h3>
<p>Phù hợp với bài toán tối ưu tổ hợp có không gian trạng thái rất lớn, nơi chỉ cần tìm <em>cấu hình đích</em> chứ không cần chuỗi hành động. Đặc điểm: chỉ lưu trạng thái hiện tại (hoặc một tập nhỏ), không lưu cây tìm kiếm/đường đi → bộ nhớ rất ít.</p>

<h4>6.1. Leo đồi (hill-climbing)</h4>
<ul>
<li>Tạo các trạng thái hàng xóm và di chuyển sang hàng xóm có hàm mục tiêu tốt hơn (tham lam cục bộ).</li>
<li>Dừng khi không còn hàng xóm tốt hơn. Nhược điểm: kẹt ở <strong>cực đại cục bộ</strong>, có thể gặp <em>plateau</em> (vùng phẳng) hoặc <em>ridge</em> (sống núi hẹp).</li>
<li>Ví dụ 8 quân hậu: h = số cặp hậu ăn nhau; có thể dừng ở trạng thái còn 1 cặp đe dọa — cực tiểu cục bộ.</li>
</ul>

<h4>6.2. Tôi thép (simulated annealing)</h4>
<ul>
<li>Mô phỏng quá trình tôi ủ kim loại: nhiệt độ T giảm dần, cấu trúc kết tinh dần ổn định.</li>
<li>Cho phép chấp nhận bước "tồi" với xác suất giảm dần theo T, giúp thoát khỏi cực trị cục bộ.</li>
<li>Nếu T giảm đủ chậm, thuật toán tìm được lời giải tối ưu toàn cục với xác suất xấp xỉ 1.</li>
<li>Ứng dụng: thiết kế mạch VLSI, lập lịch bay, bài toán tối ưu tổ hợp.</li>
</ul>

<h4>6.3. Tìm kiếm chùm cục bộ (local beam search)</h4>
<ul>
<li>Duy trì song song <code>k</code> trạng thái tốt nhất thay vì 1 trạng thái.</li>
<li>Mỗi bước sinh tất cả trạng thái kế tiếp của k trạng thái, chọn k trạng thái tốt nhất cho bước sau.</li>
<li>Khác với chạy k lần leo đồi độc lập: beam search cho phép các nhánh <em>chia sẻ thông tin</em>, tập trung tài nguyên vào vùng không gian tiềm năng.</li>
<li>Với k = 1, beam search tương đương leo đồi.</li>
</ul>

<h4>6.4. Giải thuật di truyền (Genetic Algorithm — GA)</h4>
<ul>
<li>Mô phỏng chọn lọc tự nhiên: quần thể (population) các cá thể, mỗi cá thể mã hóa một lời giải thành <strong>nhiễm sắc thể</strong> (thường chuỗi bit).</li>
<li><strong>Fitness function</strong> đánh giá độ phù hợp của từng cá thể; cá thể fitness cao có xác suất được chọn sinh sản cao hơn.</li>
<li><strong>Tái sản xuất (reproduction):</strong> giữ lại cá thể tốt, không thay đổi.</li>
<li><strong>Lai ghép (crossover):</strong> chọn ngẫu nhiên điểm cắt, ghép đoạn nhiễm sắc thể của hai cha mẹ để tạo 2 cá thể con.</li>
<li><strong>Đột biến (mutation):</strong> đảo ngẫu nhiên một bit (0→1 hoặc 1→0), duy trì đa dạng di truyền, tránh hội tụ sớm.</li>
<li>Lặp cho đến khi đạt fitness mong muốn hoặc hết số thế hệ; trả về cá thể tốt nhất.</li>
</ul>
<p><strong>Ưu điểm GA:</strong> tìm được lời giải tốt ngay cả với không gian tìm kiếm không liên tục, phức tạp; không cần đạo hàm. <strong>Nhược điểm:</strong> cần chọn mã hóa, hàm fitness, tham số (kích thước quần thể, xác suất lai ghép/đột biến); không đảm bảo tối ưu toàn cục.</p>
`
});

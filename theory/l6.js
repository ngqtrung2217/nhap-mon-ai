window.THEORY = window.THEORY || [];
window.THEORY.push({
  id: "l6", code: "L6", title: "Thỏa mãn ràng buộc (CSP)",
  sub: "CSP · backtracking · MRV/LCV · forward checking · AC-3 · min-conflicts",
  body: `
<h3>1. Bài toán thỏa mãn ràng buộc (CSP)</h3>
<p>Một CSP được biểu diễn bởi bộ ba <code>⟨X, D, C⟩</code>:</p>
<ul>
<li><strong>X = {X₁, …, Xₙ}:</strong> tập hữu hạn các biến.</li>
<li><strong>D = {D₁, …, Dₙ}:</strong> miền giá trị hữu hạn của mỗi biến (trong môn học chỉ xét miền rời rạc hữu hạn).</li>
<li><strong>C = {C₁, …, Cₖ}:</strong> tập hữu hạn các ràng buộc, mỗi ràng buộc là một quan hệ trên một tập biến.</li>
</ul>
<p><strong>Lời giải</strong> của CSP là một <em>phép gán đầy đủ</em> (gán giá trị cho mọi biến) và <em>hợp lệ</em> (không vi phạm bất kỳ ràng buộc nào). Khác với tìm kiếm trạng thái thông thường (trạng thái là "hộp đen", quan tâm chuỗi hành động), CSP cấu trúc trạng thái thành các cặp biến–giá trị, cho phép áp dụng các kỹ thuật cắt tỉa tổng quát không phụ thuộc thứ tự hành động.</p>

<h3>2. Ví dụ và mô hình hóa</h3>
<ul>
<li><strong>Tô màu bản đồ:</strong> biến = các vùng (WA, NT, Q, NSW, V, SA, T); miền = {red, green, blue}; ràng buộc = hai vùng kề nhau phải khác màu. Lời giải: WA=red, NT=green, Q=red, NSW=green, V=red, SA=blue, T=green.</li>
<li><strong>N quân hậu:</strong> mỗi cột là một biến Xᵢ; miền giá trị là vị trí hàng {1..N}. Cách này tự động thỏa mãn ràng buộc "không cùng cột"; chỉ cần kiểm tra hàng và hai đường chéo.</li>
<li><strong>Mật mã số học TWO + TWO = FOUR:</strong> biến F, T, U, W, R, O, X1, X2, X3; miền {0..9}; ràng buộc chữ số khác nhau, chữ số đầu khác 0, và các phép cộng cột có nhớ: <code>O + O = R + 10·X1</code>, <code>X1 + W + W = U + 10·X2</code>, <code>X2 + T + T = O + 10·X3</code>, <code>X3 = F</code>, <code>T ≠ 0</code>, <code>F ≠ 0</code>.</li>
<li><strong>Lập thời khóa biểu / phân công / lập lịch:</strong> biến = lớp–thời gian hoặc công việc; miền = phòng, giáo viên, ca; ràng buộc = không trùng giáo viên/phòng, thứ tự công việc…</li>
</ul>

<h3>3. Đồ thị ràng buộc và phân loại</h3>
<ul>
<li><strong>Binary CSP:</strong> mỗi ràng buộc chỉ liên quan tới hai biến. <strong>Đồ thị ràng buộc:</strong> nút = biến, cạnh = ràng buộc nhị phân.</li>
<li><strong>Ràng buộc đơn (unary):</strong> chỉ liên quan 1 biến, ví dụ <code>SA ≠ green</code>.</li>
<li><strong>Ràng buộc nhị phân (binary):</strong> liên quan 2 biến, ví dụ <code>SA ≠ WA</code>.</li>
<li><strong>Ràng buộc bậc cao (higher-order):</strong> liên quan ≥ 3 biến, ví dụ phép cộng cột có nhớ trong TWO + TWO = FOUR, hoặc ràng buộc AllDiff.</li>
<li><strong>Miền giá trị:</strong> rời rạc hữu hạn (số phép gán đầy đủ <code>O(dⁿ)</code>), rời rạc vô hạn (số nguyên, chuỗi — cần ngôn ngữ biểu diễn ràng buộc), hoặc liên tục (thời gian, tọa độ — ràng buộc tuyến tính giải được trong thời gian đa thức).</li>
</ul>

<h3>4. Tìm kiếm lời giải bằng kiểm thử (generate-and-test)</h3>
<p>Phương pháp tổng quát nhất: sinh một phép gán đầy đủ cho tất cả các biến, kiểm tra xem có thỏa mọi ràng buộc không; lặp lại đến khi tìm được lời giải. Nhược điểm nghiêm trọng: phải xét quá nhiều phép gán không thỏa mãn, đặc biệt khi số biến và miền giá trị lớn. Ví dụ X, Y, Z ∈ {1, 2} đã có 8 khả năng; với n biến, d giá trị là dⁿ.</p>
<p><strong>Cải thiện:</strong> sinh phép gán thông minh hơn (không tuần tự), dùng kết quả kiểm tra để phát hiện sớm mâu thuẫn, kiểm tra ràng buộc ngay sau mỗi biến được gán thay vì đợi gán hết.</p>

<h3>5. Tìm kiếm quay lui (backtracking)</h3>
<ul>
<li>Là thuật toán phổ biến nhất cho CSP, dựa trên <strong>DFS</strong>.</li>
<li>Mỗi lần chỉ gán giá trị cho <em>một biến</em>; sau mỗi phép gán, kiểm tra các ràng buộc với các biến đã gán; nếu vi phạm thì hủy phép gán, thử giá trị khác hoặc quay lui lên biến trước.</li>
<li>Nhờ tính <strong>giao hoán</strong> của các phép gán trong CSP (thứ tự gán không làm thay đổi tập lời giải), cây tìm kiếm chỉ cần phân nhánh <code>|Dᵢ|</code> ở tầng i, thay vì n!·dⁿ; số nút lá tối đa là dⁿ.</li>
<li>Backtracking cắt nhánh thất bại sớm hơn DFS thông thường nhờ kiểm tra ràng buộc ngay tại từng bước gán bộ phận.</li>
</ul>

<h3>6. Các heuristic chọn biến và chọn giá trị</h3>
<h4>6.1. MRV — Minimum Remaining Values</h4>
<ul>
<li>Chọn biến chưa gán có <strong>ít giá trị hợp lệ còn lại nhất</strong> (biến bị ràng buộc nhiều nhất).</li>
<li>Triết lý "bi quan": ưu tiên biến khó, dễ phát hiện bế tắc sớm, giảm số nhánh phải thử.</li>
<li>Ví dụ tô màu bản đồ Úc: sau khi gán WA=red, NT=green, biến SA chỉ còn 1 màu hợp lệ (blue) nên được chọn ngay.</li>
</ul>
<h4>6.2. Degree Heuristic</h4>
<ul>
<li>Khi nhiều biến có cùng chỉ số MRV, chọn biến <strong>tham gia vào nhiều ràng buộc nhất với các biến chưa gán</strong>.</li>
<li>Ví dụ: khi bắt đầu, SA kề với 5 vùng khác (bậc cao nhất) nên được chọn trước; NT chỉ kề 3 vùng.</li>
</ul>
<h4>6.3. LCV — Least Constraining Value</h4>
<ul>
<li>Với một biến đã chọn, ưu tiên giá trị <strong>ít làm giảm miền giá trị khả thi của các biến chưa gán kề</strong> nhất.</li>
<li>Triết lý "lạc quan": chọn giá trị dễ nhất để đi tới một lời giải, giữ nhiều linh hoạt cho các bước sau.</li>
<li>LCV chỉ hữu ích khi cần <em>một</em> lời giải; nếu cần tìm tất cả lời giải, phải duyệt mọi nhánh hợp lệ nên thứ tự thử giá trị không giảm tổng số bước.</li>
</ul>

<h3>7. Kiểm tra tiến (Forward Checking)</h3>
<ul>
<li>Khi gán <code>X = v</code>, xóa <code>v</code> (và các giá trị không hợp lệ với v) khỏi miền của mọi biến <code>Y</code> chưa gán kề với X.</li>
<li>Nếu sau khi xóa, miền của bất kỳ biến Y nào bị rỗng (<code>D_Y = ∅</code>), nhánh hiện tại thất bại → quay lui ngay, không cần gán thử tiếp.</li>
<li>Forward Checking lan truyền ràng buộc từ biến đã gán sang biến chưa gán kề nó; nó chỉ đảm bảo <strong>nhất quán cục bộ</strong>, không phát hiện được mọi mâu thuẫn (ví dụ NT và SA không thể cùng màu xanh nhưng FC có thể chưa thấy).</li>
</ul>

<h3>8. Phù hợp cạnh (Arc Consistency) và AC-3</h3>
<ul>
<li><strong>Định nghĩa:</strong> cung <code>Xi → Xj</code> là phù hợp cạnh nếu với <em>mỗi</em> giá trị <code>x ∈ D_Xi</code>, tồn tại ít nhất một giá trị <code>y ∈ D_Xj</code> sao cho cặp (x, y) thỏa ràng buộc giữa Xi và Xj.</li>
<li><strong>Không đối xứng:</strong> (X → Y) phù hợp không có nghĩa (Y → X) phù hợp. Ví dụ (SA → NSW) phù hợp nhưng (NSW → SA) không.</li>
<li><strong>AC-3:</strong> duy trì hàng đợi các cung cần kiểm tra. Khi một giá trị bị xóa khỏi <code>D_Xi</code>, tất cả các cung <code>Xk → Xi</code> (Xk kề Xi, Xk ≠ Xj) được đưa lại vào hàng đợi để lan truyền tiếp.</li>
<li><strong>Độ phức tạp:</strong> <code>O(c·d³)</code> với c là số cung, d là kích thước miền.</li>
<li>AC-3 mạnh hơn Forward Checking: nó lan truyền mâu thuẫn giữa cả các biến <em>chưa gán</em> với nhau, phát hiện thất bại sớm hơn. Tuy nhiên, đạt phù hợp cạnh <strong>không đảm bảo</strong> bài toán có lời giải — vẫn cần tìm kiếm/quay lui.</li>
</ul>

<h3>9. Tìm kiếm cục bộ cho CSP — Min-Conflicts</h3>
<ul>
<li>Khởi tạo một <strong>phép gán đầy đủ</strong> cho tất cả các biến, dù có thể vi phạm một số ràng buộc.</li>
<li>Ở mỗi bước, chọn một biến đang vi phạm ràng buộc, gán cho nó giá trị mới <strong>làm giảm tối đa tổng số mâu thuẫn</strong> trên toàn đồ thị.</li>
<li>Lặp đến khi không còn ràng buộc bị vi phạm (tìm được lời giải) hoặc hết ngân sách bước.</li>
<li><strong>Ưu điểm:</strong> rất hiệu quả với N quân hậu lớn. Với N = 1.000.000, thuật toán chỉ cần số bước gần như hằng số, độc lập với N, nhờ mật độ lời giải cao trong không gian trạng thái đầy đủ.</li>
<li><strong>Hạn chế:</strong> không đảm bảo tìm được lời giải nếu tồn tại, có thể kẹt ở cực trị cục bộ; cần khởi tạo và tham số hợp lý.</li>
</ul>
<p><strong>Tóm lại:</strong> CSP cho phép mô hình hóa bài toán bằng biến–miền–ràng buộc; backtracking + MRV/degree/LCV + forward checking/AC-3 + min-conflicts là bộ công cụ cốt lõi để giải hiệu quả.</p>
`
});

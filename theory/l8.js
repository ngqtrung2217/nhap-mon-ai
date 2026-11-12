window.THEORY = window.THEORY || [];
window.THEORY.push({
  id: "l8", code: "L8", title: "Biểu diễn tri thức",
  sub: "Dữ liệu–thông tin–tri thức · luật · khung · mạng ngữ nghĩa · ontology",
  body: `
<h3>1. Dữ liệu – Thông tin – Tri thức</h3>
<div class="table-wrap"><table>
<thead><tr><th>Mức</th><th>Định nghĩa</th><th>Ví dụ</th></tr></thead>
<tbody>
<tr><td><strong>Dữ liệu</strong></td><td>Các sự kiện (facts) hoặc ký hiệu (symbols) thô, chưa có ngữ cảnh.</td><td>"Nhiệt độ ngoài trời là 5°C."</td></tr>
<tr><td><strong>Thông tin</strong></td><td>Dữ liệu đã được xử lý/chuyển thành dạng hoặc cấu trúc phù hợp, có ý nghĩa.</td><td>"Ngoài trời thời tiết lạnh."</td></tr>
<tr><td><strong>Tri thức</strong></td><td>Sự hiểu biết về thông tin, gắn với ngữ cảnh và cách áp dụng để giải quyết vấn đề.</td><td>"Nếu trời lạnh thì nên mặc áo choàng ấm khi ra ngoài."</td></tr>
<tr><td><strong>Siêu tri thức</strong></td><td>Tri thức về cách thức và thời điểm áp dụng tri thức.</td><td>"Kinh nghiệm này chỉ áp dụng vào mùa đông."</td></tr>
</tbody></table></div>
<p><strong>Biểu diễn tri thức (knowledge representation)</strong> là bài toán quan trọng của AI: nghiên cứu các phương pháp, cách thức biểu diễn tri thức và công cụ hỗ trợ. Các tiêu chí đánh giá một phương pháp:</p>
<ul>
<li><strong>Tính hoàn chỉnh (completeness):</strong> có thể thu thập và thể hiện mọi khía cạnh của tri thức trong miền?</li>
<li><strong>Tính ngắn gọn (conciseness):</strong> có cho phép thu thập, lưu trữ và truy cập tri thức hiệu quả?</li>
<li><strong>Hiệu quả tính toán (computational efficiency):</strong> chi phí suy diễn có chấp nhận được?</li>
<li><strong>Tính rõ ràng (transparency):</strong> có thể diễn giải hoạt động và kết luận của hệ thống cho người dùng hiểu?</li>
</ul>
<p>Các phương pháp phổ biến: <strong>luật sản xuất (production rules)</strong>, <strong>khung (frames)</strong>, <strong>mạng ngữ nghĩa (semantic networks)</strong>, <strong>ontology</strong>, <strong>mô hình xác suất (probabilistic models)</strong>…</p>

<h3>2. Biểu diễn tri thức bằng luật sản xuất</h3>
<p>Một luật có dạng:</p>
<div class="formula">IF A₁ AND A₂ AND … AND Aₙ THEN B</div>
<ul>
<li><strong>A₁…Aₙ:</strong> các điều kiện — còn gọi là <em>antecedents, premises</em>.</li>
<li><strong>B:</strong> kết luận — còn gọi là <em>conclusion, consequence, action</em>.</li>
</ul>
<p><strong>Quy tắc chuẩn hóa:</strong></p>
<ul>
<li>Không cần dùng OR trong mệnh đề điều kiện. Luật <code>IF A₁ OR A₂ THEN B</code> được tách thành hai luật <code>IF A₁ THEN B</code> và <code>IF A₂ THEN B</code>.</li>
<li>Không cần dùng AND trong mệnh đề kết luận. Luật <code>IF … THEN B₁ AND B₂</code> được tách thành hai luật <code>IF … THEN B₁</code> và <code>IF … THEN B₂</code>.</li>
<li><strong>Không cho phép OR trong kết luận.</strong></li>
</ul>
<p><strong>Đồ thị AND/OR:</strong> biểu diễn cấu trúc điều kiện–kết luận của tập luật. Nút AND = các điều kiện phải đồng thời thỏa; nút OR = các lựa chọn thay thế. Ví dụ:</p>
<ul>
<li><code>IF (Shape=long) AND (Color=green OR yellow) THEN Fruit=banana</code> → hai luật: (long, green → banana) và (long, yellow → banana).</li>
<li><code>IF (Shape=round OR oblong) AND (Diam&gt;4) THEN Fruitclass=vine</code> → hai luật tương ứng.</li>
<li><code>IF (Fruitclass=vine) AND (Color=green) THEN Fruit=watermelon</code>.</li>
</ul>
<p><strong>Các kiểu luật:</strong> quan hệ liên kết (<code>IF addressAt(x,Hospital) THEN healthIs(x,Bad)</code>), quan hệ nguyên nhân–kết quả (<code>IF diseaseType(x,Infection) THEN tempIs(x,High)</code>), tình huống–hành động/gợi ý (<code>IF diseaseType(x,Infection) THEN takeMedicine(x,Antibiotic)</code>), quan hệ logic (<code>IF tempGreater(x,37) THEN isFever(x)</code>).</p>
<p><strong>Vấn đề của biểu diễn luật:</strong></p>
<ul>
<li><strong>Vòng lặp:</strong> <code>IF A THEN A</code>; hoặc {A→B, B→C, C→A}.</li>
<li><strong>Mâu thuẫn:</strong> ví dụ {A→B, B→C, A∧D→¬C}.</li>
<li><strong>Kết luận không suy ra được</strong> từ các luật hiện có.</li>
<li><strong>Khó cập nhật:</strong> khi cần thêm điều kiện C vào mọi luật, phải sửa toàn bộ cơ sở luật: {A₁→B₁, …} thành {A₁∧C→B₁, …}.</li>
</ul>

<h3>3. Suy diễn và hệ thống dựa trên luật (RBS)</h3>
<ul>
<li><strong>So khớp mẫu (pattern matching):</strong> kiểm tra một luật có thể áp dụng được không, dựa trên các sự kiện trong bộ nhớ làm việc. Ví dụ với luật {A₁→B₁, A₁∧A₂→B₂, A₂∧A₃→B₃} và sự kiện A₁, A₂, hai luật đầu có thể áp dụng.</li>
<li><strong>Chuỗi suy diễn:</strong> xác định trật tự áp dụng luật để đạt kết luận cần chứng minh. Hai chiến lược: <strong>suy diễn tiến (forward)</strong> và <strong>suy diễn lùi (backward)</strong> — đã trình bày ở bài trước (L7).</li>
<li><strong>Xung đột (conflict):</strong> xảy ra khi nhiều hơn một luật có thể áp dụng được (phù hợp với sự kiện trong working memory). Lưu ý: xung đột <em>không phải</em> mâu thuẫn logic của tập luật.</li>
<li><strong>Chiến lược giải quyết xung đột (CRS):</strong> áp dụng luật xuất hiện đầu tiên; không áp dụng luật sinh ra sự kiện đã có; áp dụng luật cụ thể nhất (nhiều điều kiện nhất); áp dụng luật phù hợp với sự kiện mới nhất; không áp dụng lại luật nếu sinh cùng tập sự kiện; áp dụng luật có độ tin cậy cao nhất; hoặc kết hợp các chiến lược.</li>
</ul>
<p><strong>Kiến trúc RBS điển hình:</strong></p>
<div class="table-wrap"><table>
<thead><tr><th>Thành phần</th><th>Vai trò</th></tr></thead>
<tbody>
<tr><td><strong>Working memory</strong></td><td>Lưu các sự kiện/giả thiết đã được chứng minh; quyết định luật nào được áp dụng.</td></tr>
<tr><td><strong>Rule memory</strong></td><td>Cơ sở tri thức của hệ thống — các luật có thể áp dụng.</td></tr>
<tr><td><strong>Interpreter</strong></td><td>Đưa dữ liệu vào working memory; khi sự kiện khớp điều kiện luật thì áp dụng luật, cập nhật kết quả.</td></tr>
</tbody></table></div>
<p><strong>Ưu điểm RBS:</strong> gần ngôn ngữ tự nhiên, dễ diễn đạt và dễ hiểu với người dùng/chuyên gia; biểu diễn khai báo (chỉ cần đưa luật vào rule base, hệ thống tự quyết định khi nào và theo trật tự nào áp dụng).</p>
<p><strong>Nhược điểm RBS:</strong> khả năng biểu diễn hạn chế (không phải tri thức miền nào cũng phù hợp IF–THEN); tương tác và trật tự giữa các luật gây hiệu ứng khó lường, khó thiết kế/bảo trì; chi phí cao. <strong>Case study:</strong> hệ tư vấn chọn môn học/project cho sinh viên dựa trên profile môn học, nguyện vọng và CPA.</p>

<h3>4. Biểu diễn tri thức bằng khung (frames)</h3>
<p><strong>Ý tưởng:</strong> biểu diễn đối tượng bằng bộ ba <strong>(Object, Property, Value)</strong> — còn gọi là object-property-value. So sánh các cách biểu diễn câu "Xe buýt màu blue":</p>
<ul>
<li><code>Blue(bus)</code>: trả lời được "Cái gì màu blue?", nhưng không trả lời được "Màu của xe buýt là gì?".</li>
<li><code>Color(bus, blue)</code>: trả lời được cả hai câu trên, nhưng không trả lời được "Thuộc tính nào của xe buýt có giá trị blue?".</li>
<li><code>Prop(bus, color, blue)</code>: trả lời được cả ba — giữ được tên thuộc tính và giá trị.</li>
</ul>
<p>Gộp nhiều thuộc tính của cùng một đối tượng thành cấu trúc → biểu diễn hướng đối tượng. Một <strong>khung</strong> là danh sách các thuộc tính (<strong>slots</strong>); giá trị gán cho slot là <strong>filler</strong>.</p>
<div class="formula">(frame-name &lt;slot-name1 filler1&gt; &lt;slot-name2 filler2&gt; …)</div>
<ul>
<li><strong>Khung cụ thể (individual frame):</strong> biểu diễn một đối tượng cụ thể; có thuộc tính đặc biệt <code>INSTANCE-OF</code> trỏ tới khung tổng quát. Thường viết chữ thường, ví dụ <code>toronto</code>.</li>
<li><strong>Khung tổng quát (generic frame):</strong> biểu diễn một lớp/loại đối tượng; có thể có <code>IS-A</code> trỏ tới khung tổng quát cha. Thường viết hoa chữ cái đầu, ví dụ <code>CanadianCity</code>.</li>
</ul>
<p><strong>Ví dụ:</strong></p>
<div class="formula">(toronto &lt;:INSTANCE-OF CanadianCity&gt; &lt;:Province ontario&gt; &lt;:Population 4.5M&gt;)
(CanadianCity &lt;:IS-A City&gt; &lt;:Province CanadianProvince&gt; &lt;:Country canada&gt;)</div>
<ul>
<li><strong>Kế thừa:</strong> giá trị/thuộc tính của khung tổng quát hơn được kế thừa bởi khung cụ thể hơn. Ví dụ Elephant có Colour=gray; RoyalElephant IS-A Elephant và có Colour=white; clyde INSTANCE-OF RoyalElephant → màu của clyde là white (giá trị cụ thể ghi đè).</li>
<li><strong>Thủ tục IF-NEEDED:</strong> chạy khi slot <em>không có giá trị</em> nhưng cần xác định giá trị — ví dụ <code>computeClearance</code> tính độ sạch của bàn.</li>
<li><strong>Thủ tục IF-ADDED:</strong> chạy khi một giá trị được thêm vào slot; có thể kích hoạt khởi tạo khung khác hoặc gán giá trị khác.</li>
</ul>
<p><strong>Quá trình suy diễn với khung:</strong> người dùng khởi tạo khung (khai báo đối tượng/tình huống) → các giá trị thuộc tính được kế thừa từ khung tổng quát → các thủ tục IF-ADDED được thực hiện, có thể sinh khung mới; nếu cần giá trị cho slot mà chưa có thì gọi IF-NEEDED.</p>
<p><strong>Ưu điểm:</strong> kết hợp tri thức khai báo và tri thức thủ tục; cấu trúc phân cấp dễ phân loại, giảm chi phí xây dựng KB; cho phép ràng buộc giá trị; lưu giá trị mặc định qua kế thừa. <strong>Nhược điểm:</strong> phải rất chú ý tính hợp lý của phân loại; chi phí thiết kế thủ tục IF-ADDED/IF-NEEDED cao; khai thác khung có thể không hiệu quả do thiếu phương pháp lưu trữ hiệu quả.</p>

<h3>5. Mạng ngữ nghĩa (semantic networks)</h3>
<ul>
<li>Do <strong>Quillian (1966)</strong> đề xuất như mô hình biểu diễn bộ nhớ con người; dựa trên đồ thị: <strong>nút</strong> = khái niệm/hành động/đối tượng; <strong>cung</strong> = quan hệ có nhãn và có hướng.</li>
<li><strong>Liên kết kế thừa:</strong> IS-A (lớp con của lớp), INSTANCE-OF (thể hiện của lớp). <strong>Liên kết miền:</strong> HAS, CAN, HAS-PART, CAUSES, HAS-COLOR…</li>
<li><strong>Ví dụ:</strong> Animal → Bird (is-a), Bird → Ostrich/Penguin/Canary/Robin (is-a); Bird travels_by flying; Ostrich travels_by walking; Canary colour yellow; Robin colour red; Tweety instance_of Canary, colour white…</li>
<li><strong>Lan truyền tác động (spreading activation):</strong> kích hoạt tác động từ khái niệm này sang khái niệm khác theo các liên kết; cho phép xác định các khái niệm liên quan hoặc "nằm giữa" hai khái niệm. Ví dụ lan truyền giữa Elephant và Plant qua Animal – eats – Plant.</li>
<li><strong>Kế thừa:</strong> <em>toàn bộ (universal)</em> — mọi quan hệ của lớp cha được kế thừa; <em>mặc định (default)</em> — kế thừa trừ khi nút con có thông tin mâu thuẫn ghi đè (ví dụ Mammal has-part Legs, has-color Grey; Elephant has-color White).</li>
<li><strong>Liên kết xác nhận (assertional):</strong> lưu sự kiện cụ thể của không gian bài toán, có thể thay đổi (ví dụ "John hit Mary"). <strong>Liên kết định nghĩa (definitional):</strong> lưu ý nghĩa khái niệm, ổn định (ví dụ "apple is-a fruit").</li>
<li><strong>Ngữ nghĩa:</strong> cùng một đồ thị có thể được diễn giải khác nhau giữa các hệ thống; không có cách diễn giải chuẩn tắc thống nhất.</li>
</ul>
<p><strong>Ưu điểm:</strong> trực quan, dễ hiểu, phù hợp với tri thức phân cấp; hỗ trợ suy diễn nhanh nhờ kế thừa; là công cụ trao đổi giữa kỹ sư tri thức và chuyên gia. <strong>Nhược điểm:</strong> ngữ nghĩa không chuẩn tắc; khó biểu diễn phủ định và tuyển; khó chọn primitive phù hợp; suy diễn hạn chế; xây dựng tốn kém.</p>

<h3>6. Ontology</h3>
<p><strong>Định nghĩa:</strong> ontology là một <em>đặc tả hình thức và rõ ràng</em> về các khái niệm; là <em>từ vựng dùng chung</em> để mô hình hóa một lĩnh vực cụ thể — gồm các đối tượng/khái niệm, thuộc tính và quan hệ của chúng.</p>
<ul>
<li>Ontology có thể xem như một cơ sở tri thức; ví dụ mô hình cơ sở dữ liệu (database schema) là một ontology.</li>
<li><strong>Động cơ:</strong> chia sẻ và tái sử dụng tri thức giữa người dùng/hệ thống; giảm chi phí xây dựng hệ dựa trên tri thức; hiểu quá trình khái niệm hóa của con người.</li>
<li><strong>Các khía cạnh:</strong> nội dung (kiểu đối tượng, quan hệ, thuộc tính, quá trình), kiểu ontology (quan hệ phân loại, định nghĩa khái niệm, khả năng diễn đạt, hướng quá trình/đối tượng), mục đích sử dụng (chia sẻ, tái sử dụng), cách xây dựng (thu thập hay xây mới, chất lượng/độ tin cậy).</li>
</ul>
<p><strong>Các bước xây dựng ontology:</strong></p>
<ol>
<li>Xác định giới hạn (phạm vi) và mục đích sử dụng; trả lời: dùng cho lĩnh vực nào, để làm gì, trả lời câu hỏi nào, ai dùng/bảo trì.</li>
<li>Cân nhắc tái sử dụng các ontology đã có.</li>
<li>Liệt kê các khái niệm: danh từ → tên lớp (class), động từ/cụm động từ → tên thuộc tính (property).</li>
<li>Định nghĩa phân loại (taxonomy) theo top-down hoặc bottom-up; đảm bảo A là lớp con của B thì mọi instance của A cũng là instance của B.</li>
<li>Định nghĩa thuộc tính; thuộc tính của lớp cha phải áp dụng cho lớp con; xác định data type và miền giá trị.</li>
<li>Định nghĩa các ràng buộc: số lượng, giá trị được gán, đặc điểm quan hệ (đối xứng, bắc cầu, đảo…).</li>
<li>Xác định các instance (ví dụ cụ thể); thường làm thủ công hoặc trích từ dữ liệu.</li>
<li>Kiểm tra các bất thường (anomalies): mâu thuẫn miền, giá trị, ràng buộc số lượng, tính bắc cầu/đối xứng/đảo…</li>
</ol>
<div class="table-wrap"><table>
<thead><tr><th>Ontology</th><th>Lĩnh vực / đặc điểm</th></tr></thead>
<tbody>
<tr><td><strong>CYC</strong></td><td>Dùng chung, tổng quát; mã hóa tri thức thông thường (common sense) của con người.</td></tr>
<tr><td><strong>SENSUS</strong></td><td>Mở rộng của WordNet, dùng cho xử lý văn bản; khoảng 70.000 khái niệm.</td></tr>
<tr><td><strong>SUMO</strong></td><td>Tổng quát; khoảng 1.000 khái niệm, 4.200 đánh giá.</td></tr>
<tr><td><strong>UMLS</strong></td><td>Y–sinh (biomedicine); 135 kiểu ngữ nghĩa, 54 quan hệ, khoảng 975.354 khái niệm.</td></tr>
<tr><td><strong>WordNet</strong></td><td>Từ vựng; 152.059 dạng từ, 115.424 cụm từ.</td></tr>
</tbody></table></div>

<h3>7. So sánh nhanh các phương pháp</h3>
<div class="table-wrap"><table>
<thead><tr><th>Phương pháp</th><th>Mạnh</th><th>Yếu</th></tr></thead>
<tbody>
<tr><td><strong>Luật sản xuất</strong></td><td>Gần ngôn ngữ tự nhiên, dễ hiểu, khai báo; phù hợp tri thức dạng điều kiện–hành động.</td><td>Hạn chế biểu diễn; vòng lặp/mâu thuẫn; khó bảo trì khi nhiều luật tương tác.</td></tr>
<tr><td><strong>Khung</strong></td><td>Kết hợp khai báo + thủ tục; phân cấp, kế thừa, giá trị mặc định; phù hợp đối tượng/tình huống.</td><td>Chi phí thiết kế thủ tục; cần phân loại hợp lý; khai thác có thể kém hiệu quả.</td></tr>
<tr><td><strong>Mạng ngữ nghĩa</strong></td><td>Trực quan, mạnh về phân cấp khái niệm; suy diễn bằng kế thừa/lan truyền tác động.</td><td>Ngữ nghĩa không chuẩn; khó biểu diễn phủ định/tuyển; suy diễn hạn chế.</td></tr>
<tr><td><strong>Ontology</strong></td><td>Đặc tả hình thức, dùng chung, tái sử dụng; nền tảng cho hệ dựa trên tri thức hiện đại.</td><td>Xây dựng tốn kém; cần kiểm tra bất thường; khó thống nhất giữa các miền.</td></tr>
</tbody></table></div>
<p><strong>Ý chính:</strong> không có phương pháp biểu diễn nào tốt cho mọi bài toán; cần chọn theo tính chất tri thức (luật, đối tượng, phân cấp khái niệm, chia sẻ liên hệ thống) và các tiêu chí hoàn chỉnh – ngắn gọn – hiệu quả – dễ hiểu.</p>
`
});

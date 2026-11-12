window.THEORY = window.THEORY || [];
window.THEORY.push({
  id: "l2", code: "L2", title: "Tác tử thông minh",
  sub: "Khái niệm · PEAS · môi trường · kiến trúc tác tử",
  body: `
<h3>1. Tác tử là gì?</h3>
<p><strong>Tác tử (agent)</strong> là bất cứ thực thể nào có khả năng <em>cảm nhận môi trường</em> xung quanh thông qua các <strong>bộ phận cảm biến (sensors)</strong> và <em>tác động trở lại</em> môi trường thông qua các <strong>bộ phận hoạt động (actuators)</strong>.</p>
<div class="table-wrap"><table>
<thead><tr><th>Loại tác tử</th><th>Sensors</th><th>Actuators</th></tr></thead>
<tbody>
<tr><td>Con người</td><td>Mắt, tai, và các bộ phận cơ thể khác</td><td>Tay, chân, miệng, và các bộ phận cơ thể khác</td></tr>
<tr><td>Robot</td><td>Camera, cảm biến hồng ngoại, cảm biến góc/động cơ</td><td>Động cơ (motors), cánh tay, bánh xe</td></tr>
<tr><td>Phần mềm</td><td>Dữ liệu vào, API, cảm biến ảo</td><td>Xuất dữ liệu, gọi API, đánh dấu email</td></tr>
</tbody></table></div>

<h3>2. Hàm tác tử và chương trình tác tử</h3>
<ul>
<li><strong>Hàm tác tử (agent function)</strong> là ánh xạ toán học từ <em>toàn bộ chuỗi nhận thức</em> (lịch sử nhận thức, percept sequence) tới một hành động: <code>f: P* → A</code>.</li>
<li><strong>Chương trình tác tử (agent program)</strong> là bản cài đặt phần mềm cụ thể chạy trên kiến trúc phần cứng để thực thi hàm tác tử đó.</li>
<li>Hàm tác tử là mô hình trừu tượng; chương trình tác tử là hiện thực cụ thể. Ví dụ: bảng hành động của máy hút bụi ánh xạ <code>[A, Bẩn] → Hút bụi</code>, <code>[B, Sạch] → Sang trái</code>…</li>
<li><strong>Tác tử hợp lý</strong> phải chọn hành động dựa trên <em>chuỗi nhận thức + tri thức</em> mà nó có, không chỉ nhận thức hiện tại.</li>
</ul>

<h3>3. Tác tử hợp lý (Rational Agent)</h3>
<ul>
<li><strong>Tiêu chí đánh giá hiệu quả (performance measure)</strong> là chuẩn khách quan để đo mức độ thành công. Ví dụ máy hút bụi: độ sạch, thời gian, điện năng, độ ồn — cần thiết kế thước đo cẩn thận để tránh tác tử "tối ưu" theo cách phản tác dụng.</li>
<li><strong>Tác tử hợp lý:</strong> với mỗi chuỗi nhận thức, chọn hành động giúp <em>cực đại hóa giá trị kỳ vọng</em> của thước đo hiệu quả, dựa trên thông tin từ chuỗi nhận thức và tri thức nội tại.</li>
<li><strong>Hợp lý ≠ thông suốt mọi thứ (omniscience):</strong> không cần biết hết mọi thứ hay dự đoán chính xác tương lai; chỉ cần ra quyết định tốt nhất với thông tin hiện có. Hợp lý cũng không đòi hỏi kết quả hoàn hảo tuyệt đối.</li>
<li><strong>Thu thập thông tin:</strong> tác tử có thể chủ động thực hiện hành động để cải thiện nhận thức trong tương lai (exploration), dù hành động đó chưa tối ưu trước mắt.</li>
<li><strong>Tác tử tự trị (autonomous agent):</strong> hành động được quyết định chủ yếu bởi kinh nghiệm của chính nó, cùng khả năng học và thích nghi; giảm dần phụ thuộc vào tri thức lập trình sẵn của người thiết kế.</li>
</ul>

<h3>4. Môi trường công việc — PEAS</h3>
<p><strong>PEAS</strong> = <strong>P</strong>erformance measure, <strong>E</strong>nvironment, <strong>A</strong>ctuators, <strong>S</strong>ensors. Đây là bước đầu tiên khi thiết kế tác tử thông minh: xác định rõ môi trường, tiêu chí hiệu quả và khả năng cảm nhận/hành động.</p>
<div class="table-wrap wide"><table>
<thead><tr><th>Tác tử</th><th>P — Hiệu quả</th><th>E — Môi trường</th><th>A — Hành động</th><th>S — Cảm biến</th></tr></thead>
<tbody>
<tr><td>Taxi tự lái</td><td>An toàn, nhanh, đúng luật, hài lòng khách, lợi nhuận</td><td>Đường phố, phương tiện, người đi bộ, khách</td><td>Bánh lái, ga, phanh, đèn, còi</td><td>Camera, GPS, tốc độ, khoảng cách, cảm biến động cơ</td></tr>
<tr><td>Chẩn đoán y tế</td><td>Sức khỏe bệnh nhân, giảm chi phí, giảm kiện cáo</td><td>Bệnh nhân, bệnh viện, nhân viên y tế</td><td>Hiển thị câu hỏi, xét nghiệm, chẩn đoán, điều trị</td><td>Bàn phím, câu trả lời/triệu chứng của bệnh nhân</td></tr>
<tr><td>Robot nhặt đồ</td><td>Tỷ lệ đồ vật đặt đúng thùng</td><td>Dây chuyền, đồ vật, thùng chứa</td><td>Cánh tay, bàn tay kẹp, cơ cấu truyền động</td><td>Camera, cảm biến góc/độ</td></tr>
<tr><td>Dạy tiếng Anh</td><td>Điểm thi tiếng Anh của học viên</td><td>Nhóm học viên</td><td>Hiển thị bài tập, gợi ý, chữa bài</td><td>Bàn phím</td></tr>
<tr><td>Lọc thư rác</td><td>Độ chính xác, giảm false positive/negative</td><td>Email server và client</td><td>Đánh dấu thư rác, gửi thông báo</td><td>Nhận và phân tích nội dung email</td></tr>
</tbody></table></div>

<h3>5. Các kiểu môi trường công việc</h3>
<div class="table-wrap"><table>
<thead><tr><th>Cặp phân loại</th><th>Định nghĩa / phân biệt</th><th>Ví dụ</th></tr></thead>
<tbody>
<tr><td><strong>Quan sát đầy đủ – một phần</strong></td><td>Đầy đủ: cảm biến truy cập toàn bộ trạng thái tại mỗi thời điểm. Một phần: cảm biến bị nhiễu, thiếu chính xác hoặc giới hạn tầm nhìn.</td><td>Cờ vua đầy đủ; chẩn đoán y tế, taxi một phần.</td></tr>
<tr><td><strong>Xác định – ngẫu nhiên – chiến lược</strong></td><td>Xác định: trạng thái kế tiếp do trạng thái hiện tại + hành động quyết định hoàn toàn. Ngẫu nhiên: có yếu tố bất định. Chiến lược: chỉ bất định do hành động của tác tử khác.</td><td>Cờ vua xác định/chiến lược; taxi ngẫu nhiên.</td></tr>
<tr><td><strong>Phân đoạn – liên tiếp</strong></td><td>Phân đoạn: trải nghiệm chia thành các giai đoạn độc lập, quyết định chỉ phụ thuộc giai đoạn hiện tại. Liên tiếp: quyết định hiện tại ảnh hưởng trạng thái tương lai.</td><td>Lọc spam phân đoạn; lái xe liên tiếp.</td></tr>
<tr><td><strong>Tĩnh – động – bán động</strong></td><td>Tĩnh: môi trường không đổi trong lúc tác tử cân nhắc. Động: liên tục biến đổi. Bán động: trạng thái không đổi nhưng hiệu quả bị thời gian ảnh hưởng.</td><td>Cờ vua tĩnh; taxi động; cờ tính giờ bán động.</td></tr>
<tr><td><strong>Rời rạc – liên tục</strong></td><td>Rời rạc: tập trạng thái, nhận thức, hành động hữu hạn và phân biệt rõ. Liên tục: giá trị biến thiên liên tục.</td><td>Cờ vua rời rạc; robot/di chuyển liên tục.</td></tr>
<tr><td><strong>Đơn tác tử – đa tác tử</strong></td><td>Đơn: tác tử hoạt động độc lập. Đa: nhiều thực thể tương tác; có thể cộng tác hoặc cạnh tranh.</td><td>Giải đố đơn; cờ vua, bóng đá đa tác tử.</td></tr>
</tbody></table></div>
<p><strong>Lưu ý:</strong> môi trường thực tế thường kết hợp nhiều thuộc tính (ví dụ taxi: một phần, động, liên tục, ngẫu nhiên). Việc phân loại giúp chọn kiến trúc tác tử phù hợp.</p>

<h3>6. Bốn kiểu tác tử cơ bản</h3>
<div class="table-wrap"><table>
<thead><tr><th>Kiểu</th><th>Cơ chế</th><th>Ưu / hạn chế</th></tr></thead>
<tbody>
<tr><td><strong>Phản xạ đơn giản</strong></td><td>Chọn hành động theo luật "điều kiện – hành động" dựa trên nhận thức hiện tại; bỏ qua lịch sử.</td><td>Đơn giản, nhanh; chỉ đúng khi quan sát đầy đủ, dễ lặp vô hạn khi thiếu quan sát.</td></tr>
<tr><td><strong>Phản xạ dựa trên mô hình</strong></td><td>Duy trì trạng thái nội bộ + mô hình thế giới chuyển trạng thái; cập nhật bằng <code>UPDATE-STATE(state, action, percept)</code>.</td><td>Xử lý được quan sát một phần; cần mô hình chính xác.</td></tr>
<tr><td><strong>Dựa trên mục tiêu</strong></td><td>Lưu tập mục tiêu, kết hợp trạng thái hiện tại để lập kế hoạch chuỗi hành động đạt đích.</td><td>Linh hoạt khi mục tiêu/trạng thái thay đổi; cần tìm kiếm/lập kế hoạch.</td></tr>
<tr><td><strong>Dựa trên lợi ích</strong></td><td>Dùng hàm lợi ích ánh xạ chuỗi trạng thái → số thực; so sánh nhiều phương án cùng đạt mục tiêu.</td><td>Chọn được phương án nhanh/an toàn/rẻ hơn; cần hàm utility tốt.</td></tr>
</tbody></table></div>
<p><strong>Tác tử có khả năng học</strong> gồm 4 thành phần:</p>
<ul>
<li><strong>Performance element:</strong> chọn hành động (phần "làm việc" chính).</li>
<li><strong>Critic:</strong> đánh giá kết quả so với tiêu chuẩn, đưa ra phản hồi.</li>
<li><strong>Learning element:</strong> dùng phản hồi để điều chỉnh performance element.</li>
<li><strong>Problem generator:</strong> đề xuất hành động khám phá để tạo kinh nghiệm mới, tránh kẹt ở lối mòn.</li>
</ul>
<p><strong>Tác tử dựa trên cơ sở tri thức (KB agent):</strong> lưu tri thức dưới dạng các mệnh đề hình thức trong KB; dùng <em>TELL</em> để cập nhật và <em>ASK</em>/suy luận để chọn hành động, thay vì chỉ phản xạ theo luật cố định.</p>

<h3>7. Đa tác tử</h3>
<ul>
<li><strong>Cộng tác (cooperative):</strong> các tác tử chia sẻ mục tiêu/thước đo hiệu quả chung; cần phân tách và phân phối nhiệm vụ. Ví dụ: tennis đánh đôi, robot phối hợp.</li>
<li><strong>Cạnh tranh (competitive):</strong> lợi ích đối nghịch; mỗi tác tử phải nhận biết sự tồn tại của đối thủ, dự đoán kế hoạch của đối thủ và ảnh hưởng của chúng lên kế hoạch của mình, rồi chọn hành động tối ưu. Ví dụ: cờ vua.</li>
<li>Trong môi trường biến động, tác tử cần cập nhật mô hình về các tác tử khác liên tục.</li>
</ul>
<p><strong>Tóm lại:</strong> thiết kế tác tử = xác định PEAS → phân loại môi trường → chọn kiến trúc (phản xạ, mô hình, mục tiêu, lợi ích, học, KB) → kiểm tra tính hợp lý và khả năng tự trị.</p>
`
});

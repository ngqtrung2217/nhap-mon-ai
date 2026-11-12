window.THEORY = window.THEORY || [];
window.THEORY.push({
  id: "l1", code: "L1", title: "Giới thiệu Trí tuệ nhân tạo",
  sub: "4 quan điểm · Turing · ứng dụng · lịch sử · lĩnh vực",
  body: `
<h3>1. Bốn quan điểm định nghĩa TTNT</h3>
<p>Người ta phân loại các định nghĩa TTNT theo hai trục: <strong>suy nghĩ – hành động</strong> và <strong>như con người – hợp lý</strong>. Từ đó có 4 nhóm quan điểm:</p>
<div class="table-wrap"><table>
<thead><tr><th></th><th>Như con người</th><th>Hợp lý</th></tr></thead>
<tbody>
<tr><td><strong>Suy nghĩ</strong></td><td>Suy nghĩ như con người — mô phỏng quá trình nhận thức, tâm lý của con người.</td><td>Suy nghĩ hợp lý — dùng logic, các luật suy diễn đúng đắn để rút ra kết luận.</td></tr>
<tr><td><strong>Hành động</strong></td><td>Hành động như con người — hành vi không phân biệt được với người (phép thử Turing).</td><td>Hành động hợp lý — chọn hành động tối đa hóa hiệu quả kỳ vọng; đây là hướng chủ đạo hiện nay.</td></tr>
</tbody></table></div>
<ul>
<li><strong>Vì sao chọn "hành động hợp lý"?</strong> Hành vi tác động ra môi trường có thể định lượng bằng thước đo hiệu quả; không buộc phải giải mã chi tiết cơ chế tư duy sinh học bên trong.</li>
<li><strong>"Suy nghĩ như con người"</strong> khó đánh giá vì tư duy con người rất đa dạng: cùng một ngữ cảnh, mỗi người có thể xử lý khác nhau.</li>
<li><strong>"Suy nghĩ hợp lý"</strong> đánh giá quá trình lập luận nội tại có đúng quy tắc không; <strong>"hành động hợp lý"</strong> đánh giá kết quả hành vi có hiệu quả không.</li>
</ul>

<h3>2. Phép thử Turing (1950)</h3>
<p>Turing đặt câu hỏi "Máy tính có thể suy nghĩ được không?" và chuyển thành "Máy tính có thể hành động một cách thông minh được không?". Ông đề xuất <strong>Imitation Game</strong>:</p>
<ul>
<li>Người thẩm vấn trao đổi bằng <strong>văn bản</strong> với một người và một máy tính, không thấy mặt hay nghe giọng.</li>
<li>Nếu người thẩm vấn không phân biệt được đâu là máy, máy được coi là thể hiện hành vi thông minh.</li>
<li>Kênh văn bản loại bỏ nhiễu về ngoại hình, giọng nói — tập trung vào khả năng hội thoại.</li>
</ul>
<p>Turing xác định 4 thành phần nền tảng mà một hệ thống cần có:</p>
<ul>
<li><strong>Xử lý ngôn ngữ tự nhiên</strong> — giao tiếp, hiểu và sinh ngôn ngữ.</li>
<li><strong>Biểu diễn tri thức</strong> — lưu trữ thông tin, sự kiện.</li>
<li><strong>Lý luận tự động</strong> — rút ra kết luận mới từ tri thức đã có.</li>
<li><strong>Học máy</strong> — thích ứng với ngữ cảnh, dữ liệu mới.</li>
</ul>
<p><strong>Hạn chế:</strong> phép thử chỉ đánh giá hành vi hội thoại bên ngoài, không trực tiếp kiểm tra tri thức nền, khả năng học hay nhận thức bên trong của hệ thống.</p>

<h3>3. Những cột mốc ứng dụng tiêu biểu</h3>
<ul>
<li><strong>Tìm đường, trò chơi:</strong> bài toán tìm đường đi, chơi cờ — các ví dụ kinh điển của tìm kiếm và tác tử.</li>
<li><strong>IBM Watson (2011):</strong> thắng hai nhà vô địch con người tại game show <em>Jeopardy!</em>; khai thác khoảng 200 triệu trang web (gồm Wikipedia), hiểu câu hỏi ngôn ngữ tự nhiên có ẩn ý, chơi chữ, truy xuất và xếp hạng câu trả lời theo độ tin cậy.</li>
<li><strong>GoogleBrain (2012):</strong> mạng nơ-ron hơn 1 tỷ kết nối trên 16.000 bộ vi xử lý, học không giám sát từ 10 triệu ảnh YouTube; tự phát hiện khuôn mặt, bộ phận cơ thể và khái niệm "con mèo" mà không được dán nhãn.</li>
<li><strong>GAN (Goodfellow, 2014):</strong> hai mạng nơ-ron đối kháng — mạng sinh (generator) tạo dữ liệu giả, mạng phân biệt (discriminator) phân biệt thật/giả; tạo ảnh khuôn mặt người không có thật, nghệ thuật, hỗ trợ ảnh thiên văn.</li>
<li><strong>AlphaGo (Google DeepMind, 3/2016):</strong> thắng Lee Sedol 4-1; học từ 30 triệu nước đi của con người rồi tự chơi (self-play) để tìm nước đi mới; kết hợp mạng nơ-ron đánh giá với tìm kiếm cây trò chơi.</li>
<li><strong>Xe tự lái (Google, 2009), trợ lý ảo:</strong> Siri (Apple, 2011), Cortana (Microsoft, 2014), Alexa (Amazon, 2014).</li>
<li><strong>Sophia (Hanson Robotics, 2016):</strong> robot hình người được gọi là "công dân robot" đầu tiên.</li>
<li><strong>Alibaba (2018):</strong> AI xử lý ngôn ngữ vượt con người trong bài kiểm tra đọc hiểu của Stanford.</li>
</ul>

<h3>4. Lịch sử tóm tắt của TTNT</h3>
<div class="table-wrap"><table>
<thead><tr><th>Thời gian</th><th>Sự kiện chính</th></tr></thead>
<tbody>
<tr><td>1943</td><td>McCulloch &amp; Pitts đề xuất mô hình nơ-ron nhân tạo hai trạng thái on/off — công trình AI đầu tiên.</td></tr>
<tr><td>1950</td><td>Turing công bố "Computing Machinery and Intelligence", đề xuất Imitation Game.</td></tr>
<tr><td>1952–1969</td><td>Các chương trình AI đầu tiên: Samuel (cờ đam, tự học), Logic Theorist và GPS của Newell &amp; Simon, chương trình chứng minh định lý hình học của Gelernter; Lisp (1958); Robinson đề xuất phép giải (1965).</td></tr>
<tr><td>1956</td><td>Hội thảo Dartmouth kéo dài khoảng 2 tháng; thuật ngữ "Artificial Intelligence" được thừa nhận, AI trở thành ngành khoa học độc lập.</td></tr>
<tr><td>1966–1973<br>(một số tài liệu ghi 1974–1980)</td><td><strong>Mùa đông AI lần thứ nhất:</strong> kỳ vọng vượt quá khả năng phần cứng; độ phức tạp tính toán; các phương pháp hiệu quả trên ví dụ hẹp nhưng thất bại khi mở rộng; gần như không còn nghiên cứu mạng nơ-ron.</td></tr>
<tr><td>1969–1979</td><td>Chuyển hướng sang hệ thống dựa trên tri thức: tích hợp khối lượng lớn tri thức chuyên môn cho từng miền ứng dụng.</td></tr>
<tr><td>1980–1988</td><td>Hệ chuyên gia bùng nổ thương mại, AI trở thành ngành công nghiệp tỷ đô.</td></tr>
<tr><td>1986</td><td>Lan truyền ngược (back-propagation) và xử lý phân tán song song giúp huấn luyện mạng nhiều tầng; mạng nơ-ron trở lại.</td></tr>
<tr><td>1987–1993</td><td><strong>Mùa đông AI lần thứ hai:</strong> chi phí lưu trữ/xử lý dữ liệu cao, thiếu hạ tầng chia sẻ dữ liệu, thất bại của các dự án lớn (tiêu biểu là dự án máy tính thế hệ 5 của Nhật).</td></tr>
<tr><td>1997</td><td>Deep Blue thắng đại kiện tướng cờ vua thế giới.</td></tr>
<tr><td>1999–2000</td><td>Sony AIBO (chó robot học qua tương tác), Honda ASIMO (robot hình người).</td></tr>
<tr><td>2010–nay</td><td>Dữ liệu đa dạng, khắp nơi thúc đẩy học máy/học sâu; trợ lý ảo, xe tự lái, GAN, AlphaGo, các mô hình ngôn ngữ lớn.</td></tr>
</tbody></table></div>
<p><strong>Bài học từ các mùa đông AI:</strong> tránh kỳ vọng vượt xa hạ tầng phần cứng và thuật toán hiện có; cần cân bằng giữa mô hình lý thuyết và khả năng cung cấp, lưu trữ, xử lý dữ liệu thực tế.</p>

<h3>5. Các nền tảng liên ngành của TTNT</h3>
<ul>
<li><strong>Triết học:</strong> nhận thức, tính duy lý, mối quan hệ giữa tri thức và hành động.</li>
<li><strong>Logic:</strong> cú pháp, ngữ nghĩa hình thức và các luật suy diễn đảm bảo tính đúng đắn của lập luận.</li>
<li><strong>Toán học:</strong> giải thuật, tối ưu hóa, lý thuyết tính toán, độ phức tạp.</li>
<li><strong>Xác suất thống kê:</strong> mô hình hóa và ra quyết định trong môi trường không chắc chắn, không đầy đủ.</li>
<li><strong>Kinh tế học:</strong> hàm mục tiêu/lợi ích, ra quyết định tối ưu với tài nguyên hạn chế.</li>
<li><strong>Lý thuyết điều khiển:</strong> hệ tự điều chỉnh, cực đại hóa tiêu chí hiệu quả dựa trên phản hồi.</li>
<li><strong>Khoa học thần kinh, tâm lý học, công nghệ máy tính, ngôn ngữ học:</strong> mô hình nơ-ron, nhận thức, hạ tầng tính toán, xử lý ngôn ngữ.</li>
</ul>

<h3>6. Các lĩnh vực nghiên cứu chính</h3>
<ul>
<li><strong>Học máy (Machine Learning) và Học sâu (Deep Learning):</strong> học từ dữ liệu, tự cải thiện hiệu năng; học sâu dùng mạng nơ-ron nhiều tầng để học biểu diễn phức tạp.</li>
<li><strong>Thị giác máy tính (Computer Vision):</strong> nhìn, phân tích, hiểu hình ảnh và video.</li>
<li><strong>Xử lý ngôn ngữ tự nhiên (NLP) và xử lý tiếng nói:</strong> giao tiếp, hiểu, phân tích, tổng hợp ngôn ngữ.</li>
<li><strong>Lập luận và suy diễn:</strong> biểu diễn tri thức, tìm kiếm, lập kế hoạch, hệ chuyên gia.</li>
<li><strong>Robot (Robotics):</strong> chuyển động, thao tác vật lý, tương tác với môi trường.</li>
<li><strong>Hệ đa tác tử:</strong> nhiều tác tử hợp tác hoặc cạnh tranh.</li>
</ul>
<p><strong>Ý chính cần nhớ:</strong> TTNT hiện đại lấy <em>hành động hợp lý</em> làm trung tâm; sức mạnh của hệ thống đến từ sự kết hợp giữa <em>tri thức</em>, <em>suy luận</em>, <em>học</em> và <em>dữ liệu/hạ tầng</em>.</p>
`
});

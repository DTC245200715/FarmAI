# Bước 1 — Phân tích nghiệp vụ và yêu cầu

## 1. Cơ sở và phạm vi

Tài liệu này đặc tả yêu cầu bước đầu dựa trên báo cáo nguồn [AI.pdf](./tai-lieu-tham-khao/AI.pdf), chủ yếu là phần khảo sát nghiệp vụ (trang in 12–16) và các Use Case UC01–UC09 (trang in 17–37). Nội dung ghi rõ đâu là yêu cầu được nêu trong nguồn và đâu là điểm còn cần nhóm xác nhận; không bổ sung dữ liệu trang trại hoặc ngưỡng nghiệp vụ chưa có căn cứ.

Các lựa chọn đã được người dùng chốt:

- Dùng repo hiện có `FarmAI-main`.
- Phạm vi MVP theo báo cáo: bò, heo, gà; thiết kế có thể mở rộng loài.
- Danh sách vai trò chuẩn bước này: Admin, Quản lý trang trại, Nhân viên chăn nuôi. Nghiệp vụ Kỹ thuật viên thú y xuất hiện ở UC08 được gộp vào Nhân viên; câu “4 vai trò” tại UC01 được ghi nhận là điểm không nhất quán trong báo cáo.
- Chưa có ngày nộp/bảo vệ được xác nhận.

> **Điểm cần lưu ý:** repo hiện có thêm các tên vai trò “Chủ trang trại”, “Kỹ sư chăn nuôi”, “Bác sĩ thú y” và “Nhân viên”. Tài liệu yêu cầu này chưa đổi mô hình hoặc mã nguồn; việc ánh xạ/migration tên vai trò sẽ được xử lý ở bước thiết kế/triển khai tương ứng sau khi rà soát các màn hình và API.

## 2. Nghiệp vụ hiện được tài liệu nguồn xác nhận

| Mảng | Quy trình được mô tả trong nguồn | Ngoại lệ/ràng buộc được nêu |
|---|---|---|
| Chuồng trại và đàn | Xem, thêm, sửa, xóa thông tin chuồng/đàn; kiểm tra dữ liệu trước khi lưu. Theo khảo sát, quản lý theo chuồng, đàn/lứa và cá thể khi cần. | Dữ liệu thiếu/sai, trùng thông tin hoặc thao tác không được quyền thì không lưu và phải thông báo. |
| Chăm sóc | Đề tài xác định chăm sóc là nghiệp vụ trọng tâm; dữ liệu AI có thể gồm thông tin vật nuôi, sức khỏe và tiêm phòng. | Báo cáo chưa có Use Case riêng định nghĩa loại lịch chăm sóc, tần suất, người giao/nhận việc hay trạng thái hoàn thành. Không tự suy diễn các trường này. |
| Sức khỏe và tiêm phòng | Chọn vật nuôi; xem/cập nhật dữ liệu sức khỏe, cân nặng, nhiệt độ, triệu chứng, lịch sử sức khỏe, thông tin và lịch tiêm phòng. | Dữ liệu không hợp lệ, không tìm thấy vật nuôi hoặc người dùng không có quyền cập nhật thì từ chối cập nhật. Báo cáo chưa quy định cụ thể cách tính “sắp đến hạn”. |
| Thức ăn và chi phí | Theo dõi thức ăn, nhập/xuất/sử dụng, tồn kho, đơn giá và chi phí; lưu giao dịch và cập nhật số liệu. | Số lượng/đơn giá không hợp lệ hoặc lượng dùng vượt tồn kho thì từ chối. |
| Tăng trưởng | Ghi ngày cân, số con cân mẫu, tổng khối lượng; tính khối lượng trung bình và ADG giữa hai kỳ cân liên tiếp. | Tổng khối lượng và số con mẫu phải dương; ngày cân không trước ngày bắt đầu nuôi. ADG trên 1.500 g/ngày hoặc sụt cân nghiêm trọng phải cảnh báo xác nhận lại. “Sụt cân nghiêm trọng” chưa có ngưỡng số học; ngưỡng ADG cần được xác nhận theo loài trước khi áp dụng chung. |
| Xuất bán | Quản lý chọn đàn và lập phiếu; nhập ngày, số lượng, tổng khối lượng lô, đơn giá và đối tác thu mua. Doanh thu = tổng khối lượng × đơn giá. Giao dịch cập nhật phiếu, biến động đàn và quân số trong một transaction; đàn về 0 được đánh dấu đã xuất bán; có hóa đơn PDF. | Chỉ Quản lý hoặc Admin được xuất bán theo UC09; số lượng xuất phải dương và không vượt quân số; khối lượng và đơn giá phải dương. Lỗi CSDL phải rollback toàn bộ giao dịch. |
| AI hỗ trợ và hỏi đáp | AI đọc dữ liệu liên quan được phép, trả mức rủi ro/giải thích/cảnh báo/khuyến nghị; lưu lịch sử phân tích và hỏi đáp. | Thiếu dữ liệu thì yêu cầu bổ sung hoặc báo chưa đủ cơ sở; dịch vụ lỗi thì báo lỗi; độ tin cậy thấp hoặc câu hỏi ngoài phạm vi thì nêu giới hạn và hướng tới chuyên gia. AI hỗ trợ quyết định, không thay thế chuyên gia hay tự thực hiện hành động. |
| Dashboard/báo cáo | Tổng hợp đàn, sức khỏe, tiêm phòng, thức ăn, chi phí và dữ liệu AI phù hợp; dữ liệu hiển thị theo quyền. | Không có dữ liệu, không đủ quyền hoặc lỗi truy xuất phải có trạng thái/thông báo tương ứng. |

### Công thức được ghi trong báo cáo

- Khối lượng trung bình mẫu: `W_tb = tổng khối lượng mẫu / số con mẫu`.
- ADG giữa hai kỳ cân: `((W_tb2 - W_tb1) * 1000) / (t2 - t1)` (g/con/ngày).
- Doanh thu phiếu xuất: `tổng khối lượng lô * đơn giá (VNĐ/kg)`.

FCR được nêu trong mục tiêu/báo cáo tổng quan, nhưng phần quy trình và công thức đầu vào chưa được đặc tả đủ trong các yêu cầu được rà soát; cần làm rõ trước khi coi là chỉ số nghiệm thu.

## 3. Yêu cầu chức năng

| ID | Yêu cầu |
|---|---|
| FR-01 | Người dùng đăng nhập bằng tài khoản đang hoạt động; hệ thống xác thực thông tin, cấp phiên JWT và áp dụng quyền theo vai trò. Báo cáo yêu cầu mật khẩu băm bằng BCrypt. |
| FR-02 | Admin quản trị tài khoản/vai trò; hệ thống phải từ chối thao tác trái quyền. Phạm vi CRUD tài khoản của từng vai trò cần được chốt ở thiết kế RBAC. |
| FR-03 | Người có quyền xem dashboard/báo cáo được xem số liệu đàn, sức khỏe, tiêm phòng, thức ăn, chi phí và dữ liệu AI phù hợp với quyền của mình. |
| FR-04 | Quản lý chuồng trại và đàn theo chuồng/đàn/lứa; cho phép xem và các thao tác thêm/sửa/xóa đã được cấp quyền; chặn dữ liệu thiếu, sai hoặc trùng. |
| FR-05 | Ghi nhận và xem dữ liệu sức khỏe, triệu chứng, cân nặng, nhiệt độ, lịch sử sức khỏe và vaccine/lịch tiêm; kiểm tra đầu vào và quyền cập nhật. |
| FR-06 | Quản lý giao dịch thức ăn, tồn kho và chi phí; lượng sử dụng không được vượt tồn kho; số liệu giao dịch phải cập nhật nhất quán. |
| FR-07 | Ghi kỳ cân mẫu, kiểm tra điều kiện đầu vào, tính khối lượng trung bình và ADG, hiển thị lịch sử/biểu đồ, cảnh báo dữ liệu tăng trưởng bất thường theo quy tắc đã chốt. |
| FR-08 | Chỉ Quản lý/Admin lập phiếu xuất bán; kiểm tra số lượng, khối lượng và đơn giá; tính doanh thu; cập nhật phiếu, biến động đàn và số lượng bằng transaction; rollback khi có lỗi; xuất hóa đơn PDF. |
| FR-09 | AI phân tích dữ liệu liên quan để đưa ra tóm tắt, mức rủi ro, giải thích, cảnh báo/khuyến nghị và lưu lịch sử. AI không được tự ghi/sửa/xóa dữ liệu nghiệp vụ. |
| FR-10 | Trợ lý AI trả lời câu hỏi kỹ thuật trong phạm vi, lưu lịch sử; xử lý thiếu thông tin, câu hỏi ngoài phạm vi, độ tin cậy thấp và lỗi dịch vụ bằng thông báo rõ ràng. |

## 4. Yêu cầu phi chức năng

| ID | Nhóm | Yêu cầu nguồn và cách hiểu để nghiệm thu |
|---|---|---|
| NFR-01 | Bảo mật | Băm mật khẩu bằng BCrypt; dùng JWT và kiểm tra RBAC; API key chỉ nằm phía máy chủ, không đưa ra frontend. |
| NFR-02 | Hiệu năng | Báo cáo yêu cầu theo dõi thời gian phản hồi API nghiệp vụ và thời gian AI. Chưa có ngưỡng thời gian; cần chốt mục tiêu đo trước khi nghiệm thu hiệu năng. |
| NFR-03 | Độ tin cậy | Báo cáo đặt mục tiêu chính xác 100% cho doanh thu, tồn kho và biến động số lượng. Đây là mục tiêu kiểm thử cho tính toán/giao dịch, chưa phải kết quả đã đo; phải chứng minh bằng ca kiểm thử thực tế. |
| NFR-04 | Toàn vẹn dữ liệu | Các lỗi validation/quyền phải không ghi dữ liệu sai; giao dịch xuất bán lỗi phải rollback; dữ liệu AI đầu vào phải thuộc đối tượng/người dùng được phép truy cập. |
| NFR-05 | Khả năng phục hồi AI | Khi thiếu dữ liệu, AI độ tin cậy thấp hoặc dịch vụ không khả dụng, hệ thống phải trả trạng thái có nghĩa và không tạo kết quả thành công giả. PDF chưa ấn định timeout, retry hay cơ chế fallback. |
| NFR-06 | Khả năng mở rộng | Mô hình dữ liệu hỗ trợ bò, heo, gà ở MVP và có khả năng bổ sung loài; trường chuyên biệt theo loài chỉ thêm khi có yêu cầu nghiệp vụ. |

## 5. Ma trận phân quyền bước đầu (RBAC)

Ký hiệu: **Được nêu** = vai trò xuất hiện trong tác nhân của Use Case; **Giới hạn rõ** = quyền được quy định cụ thể; **Chưa đặc tả** = PDF chưa tách quyền xem/tạo/sửa/xóa/xác nhận. Việc xuất hiện trong danh sách tác nhân không tự động đồng nghĩa với quyền CRUD đầy đủ.

| Chức năng | Admin | Quản lý trang trại | Nhân viên chăn nuôi | Căn cứ / điểm cần chốt |
|---|---|---|---|---|
| Đăng nhập | Được nêu | Được nêu | Được nêu | UC01 |
| Quản lý tài khoản/vai trò | Được nêu: quản trị hệ thống | Chưa đặc tả | Chưa đặc tả | Mô tả tác nhân Admin; cần xác định thao tác và phạm vi quản trị |
| Dashboard/báo cáo | Được nêu | Được nêu | Được nêu | UC02 nói dữ liệu/báo cáo theo quyền; chưa định nghĩa từng mức |
| Chuồng trại/đàn | Được nêu | Được nêu | Được nêu | UC03 liệt kê cả ba; quyền từng thao tác CRUD chưa tách |
| Sức khỏe/tiêm phòng | Được nêu | Được nêu | Được nêu | UC04 liệt kê cả ba; quyền xem/cập nhật phải được cấu hình |
| Thức ăn/chi phí | Được nêu | Được nêu | Được nêu | UC05 liệt kê cả ba; quyền xem/cập nhật chưa tách |
| AI hỗ trợ/hỏi đáp | Được nêu | Được nêu | Được nêu | UC06–UC07; dữ liệu truy xuất phải theo quyền |
| Theo dõi tăng trưởng | Chưa nêu trong UC08 | Được nêu | Được nêu | UC08 còn nêu Kỹ thuật viên thú y; theo lựa chọn đã chốt, vai trò này gộp vào Nhân viên |
| Xuất bán | Được phép | Được phép | Không được nêu quyền | UC09 giới hạn Quản lý/Admin; nhân viên không được cấp quyền xuất bán theo đặc tả này |

## 6. Câu hỏi khảo sát còn mở

Các điểm dưới đây chưa được nguồn trả lời đủ để biến thành quy tắc hệ thống. Cần nhóm xác nhận trước khi thiết kế chi tiết các phần liên quan.

1. **Chăm sóc:** những loại công việc nào nằm trong MVP; có lịch lặp, người phụ trách, thời điểm hoàn thành và ghi chú hay không?
2. **Tiêm phòng:** cần quản lý theo cá thể hay cả đàn; thông tin bắt buộc của một mũi tiêm là gì; quy tắc “sắp đến hạn” tính trước bao nhiêu ngày?
3. **Tăng trưởng:** ngưỡng cảnh báo ADG có khác theo bò/heo/gà hoặc giai đoạn nuôi không? “Sụt cân nghiêm trọng” được định nghĩa bằng công thức/ngưỡng nào? Có chủ trương áp dụng 1.500 g/ngày cho mọi loài không?
4. **FCR:** cần ghi những dữ liệu đầu vào nào, tính trên cá thể hay đàn, và kỳ báo cáo ra sao?
5. **Thức ăn/chi phí:** đơn vị quản lý tồn kho, cách quy đổi đơn vị, và các loại chi phí ngoài thức ăn cần theo dõi là gì?
6. **Xuất bán:** có cần bắt buộc nhập thông tin đối tác/khối lượng theo từng cá thể hay chỉ tổng lô? Ai ngoài Quản lý/Admin được xem lịch sử hoặc lập nháp?
7. **Phân quyền:** Admin có quyền nghiệp vụ toàn hệ thống hay chỉ quản trị người dùng? Nhân viên có được tạo dữ liệu hay chỉ ghi nhận các tác vụ được giao?
8. **AI:** thời gian chờ/retry/fallback mong muốn là gì; lịch sử AI lưu bao lâu; kết quả có cần người dùng xác nhận trước khi hiển thị như cảnh báo chính thức không?
9. **Nghiệm thu:** ngưỡng thời gian phản hồi API/AI và môi trường triển khai mục tiêu nào sẽ được dùng?
10. **Vai trò và thành viên:** nhóm xác nhận tên vai trò hiển thị, người phụ trách từng module và ngày nộp/bảo vệ để cập nhật kế hoạch.

## 7. Ghi nhận mâu thuẫn nguồn và phạm vi quyết định

- UC01 nói “4 vai trò”, trong khi danh sách tác nhân chính nêu ba vai trò.
- UC08 gọi “Kỹ thuật viên thú y”, không có trong danh sách tác nhân chung. Người dùng đã chốt lựa chọn mặc định: gộp nghiệp vụ này vào Nhân viên chăn nuôi.
- Repo hiện tại dùng các tên vai trò khác với báo cáo và có thêm “Nhân viên”; chưa đồng bộ code trong bước phân tích yêu cầu này.
- Báo cáo nguồn xác nhận MVP nhiều loài (bò/heo/gà), khác giả định heo-only được trao đổi trước đó; người dùng đã chốt theo báo cáo.
- Các con số thực nghiệm, SLA, dữ liệu trang trại và kết quả kiểm thử không được suy ra từ đặc tả; chỉ ghi sau khi có lần chạy hoặc xác nhận thực tế.

## 8. Bàn giao và kiểm tra

- **Bàn giao:** yêu cầu chức năng, phi chức năng, ma trận RBAC sơ bộ và danh sách câu hỏi mở trong tài liệu này.
- **Kiểm tra:** đối chiếu nội dung với phần khảo sát và UC01–UC09 của `docs/tai-lieu-tham-khao/AI.pdf`; các điểm chưa có căn cứ được đánh dấu là chưa đặc tả.
- **Kết quả tự kiểm tra:** tài liệu chỉ nêu số liệu có trong PDF (ví dụ ADG 1.500 g/ngày) và không khẳng định số liệu đó đã được kiểm chứng ngoài thực tế.
- **Đối chiếu tiêu chí:** T1 — yêu cầu nghiệp vụ và RBAC; T2 — phạm vi chức năng và AI; T3 — validation, quyền, lỗi AI và mục tiêu kiểm thử; T4 — đầu vào yêu cầu cho giao diện/báo cáo; T5 — ranh giới AI và phân biệt yêu cầu với kết quả đã kiểm chứng.

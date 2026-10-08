---
faq:
  - q: "Mã QR chuyển khoản tạo ở đây có dùng được với mọi ngân hàng không?"
    a: "Công cụ tạo mã theo chuẩn VietQR (NAPAS 247, định dạng EMVCo). Hầu hết ứng dụng ngân hàng tại Việt Nam có chức năng quét mã QR chuyển khoản đều đọc được mã này và tự điền sẵn ngân hàng, số tài khoản, số tiền và nội dung."
  - q: "Công cụ có chuyển tiền hay xem được số dư của tôi không?"
    a: "Không. Công cụ chỉ tạo ra một hình mã QR chứa thông tin nhận tiền. Nó không kết nối với ngân hàng, không chuyển tiền và không thể xem số dư hay lịch sử giao dịch của bạn."
  - q: "Vì sao nội dung chuyển khoản bị mất dấu?"
    a: "Nhiều ngân hàng từ chối hoặc làm lỗi nội dung có dấu tiếng Việt và nội dung quá dài. Vì vậy công cụ tự bỏ dấu và giới hạn nội dung ở 50 ký tự để mã quét được ổn định trên nhiều ứng dụng."
  - q: "Có nên điền số tiền không?"
    a: "Nếu bạn thu một khoản cố định, ví dụ một hóa đơn, hãy điền số tiền để người chuyển không gõ nhầm. Nếu để trống, người chuyển sẽ tự nhập số tiền, phù hợp với mã dán ở quầy hoặc mã dùng lâu dài."
  - q: "Làm sao kiểm tra mã QR đúng tài khoản trước khi in?"
    a: "Mở ứng dụng ngân hàng của chính bạn, chọn quét mã QR và xem tên chủ tài khoản hiện ra. Nếu đúng tên bạn thì thoát ra, không cần chuyển. Hãy làm bước này trước khi gửi mã cho người khác hoặc in ra."
  - q: "Số tài khoản của tôi có bị gửi lên máy chủ không?"
    a: "Không. Mã QR được tạo hoàn toàn trên trình duyệt của bạn, số tài khoản và nội dung không được gửi đi hay lưu lại ở đâu cả."
---

## Cách tạo mã QR chuyển khoản

1. Chọn **Ngân hàng** của bạn trong danh sách.
2. Nhập **Số tài khoản** nhận tiền.
3. Điền **Số tiền (không bắt buộc)** nếu muốn thu đúng một khoản, để trống nếu người chuyển tự nhập.
4. Ghi **Nội dung chuyển khoản (không bắt buộc)**, ví dụ mã đơn hàng hoặc tên người đóng tiền.
5. Bấm **Tải PNG** để lưu mã về máy, rồi quét thử bằng ứng dụng ngân hàng của bạn để kiểm tra tên tài khoản.

## Mã VietQR hoạt động thế nào?

VietQR là chuẩn mã QR chuyển khoản dùng chung tại Việt Nam, xây dựng trên chuẩn EMVCo và mạng chuyển tiền nhanh NAPAS 247. Mã chứa thông tin ngân hàng, số tài khoản, và tùy chọn thêm số tiền, nội dung. Khi người chuyển quét bằng ứng dụng ngân hàng, các ô này được điền sẵn, họ chỉ cần kiểm tra và xác nhận.

| Bạn điền | Người chuyển thấy gì khi quét |
| --- | --- |
| Chỉ ngân hàng và số tài khoản | Điền sẵn tài khoản, tự nhập số tiền và nội dung |
| Thêm số tiền | Điền sẵn số tiền cho một lần thanh toán |
| Thêm nội dung | Điền sẵn nội dung (đã bỏ dấu, tối đa 50 ký tự) |

Mã chỉ chứa thông tin nhận tiền. Công cụ không chuyển tiền, không xem được số dư và không cần đăng nhập ngân hàng.

## Dùng mã QR chuyển khoản vào việc gì?

- **Quầy bán hàng, quán ăn**: in mã không kèm số tiền dán ở quầy, khách quét rồi tự nhập số tiền.
- **Freelancer, bán hàng online**: gửi mã kèm số tiền và mã đơn trong nội dung để dễ đối soát.
- **Thu tiền bạn bè**: chia tiền ăn uống, quỹ lớp, tiền du lịch chung mà không phải đọc số tài khoản.
- **Hóa đơn, phiếu thu**: chèn mã vào hóa đơn để khách thanh toán nhanh và đúng nội dung.

## Mẹo dùng mã QR chuyển khoản an toàn

- Luôn quét thử bằng ứng dụng ngân hàng của bạn để kiểm tra tên chủ tài khoản trước khi chia sẻ hoặc in.
- Nội dung nên ngắn và có mã riêng (mã đơn, tên lớp) để đối chiếu giao dịch dễ hơn.
- Với mã dán ở quầy, kiểm tra định kỳ để chắc chắn mã không bị dán đè bằng mã khác.

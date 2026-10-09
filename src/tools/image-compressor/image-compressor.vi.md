---
faq:
  - q: "Ảnh của tôi có bị tải lên máy chủ không?"
    a: "Không. Ảnh được nén ngay trên trình duyệt của bạn bằng Canvas API và không bao giờ được gửi lên máy chủ. Bạn có thể dùng cả khi ảnh có thông tin cá nhân như giấy tờ, hóa đơn."
  - q: "Nên chọn Chất lượng bao nhiêu?"
    a: "Với ảnh chụp, mức 70 đến 85 thường cân bằng tốt giữa dung lượng và độ nét, khó thấy khác biệt bằng mắt thường. Mặc định là 80. Nếu ảnh vẫn quá nặng, hãy giảm Chất lượng hoặc nhập thêm Chiều rộng tối đa (px)."
  - q: "Vì sao chọn PNG mà ảnh không nhỏ đi, thậm chí nặng hơn?"
    a: "PNG là định dạng nén không mất dữ liệu nên thanh Chất lượng không có tác dụng. Với ảnh chụp, PNG thường nặng hơn nhiều so với JPEG hay WebP. Chỉ nên dùng PNG cho ảnh chụp màn hình, logo hoặc ảnh cần giữ nền trong suốt."
  - q: "Ảnh PNG nền trong suốt khi lưu JPEG bị sao?"
    a: "JPEG không hỗ trợ nền trong suốt, nên phần trong suốt sẽ được tô màu trắng. Nếu cần giữ nền trong suốt, hãy chọn Định dạng WebP hoặc PNG."
  - q: "Có nén được ảnh HEIC chụp từ iPhone không?"
    a: "Chưa hỗ trợ. Công cụ nhận ảnh JPG, PNG và WebP. Với ảnh HEIC, hãy xuất hoặc chia sẻ ảnh dưới dạng JPG trên điện thoại trước rồi mới chọn ảnh."
  - q: "Ảnh sau khi nén có còn thông tin vị trí GPS không?"
    a: "Không. Ảnh đầu ra không còn dữ liệu EXIF như vị trí GPS, thời gian chụp hay dòng máy. Điều này giúp bảo vệ quyền riêng tư khi bạn đăng ảnh hoặc gửi cho người khác."
---

## Cách nén ảnh online

1. Bấm **Chọn ảnh** và chọn một hoặc nhiều ảnh JPG, PNG hoặc WebP cùng lúc.
2. Kéo thanh **Chất lượng** (từ 10 đến 100, mặc định 80). Số càng nhỏ ảnh càng nhẹ nhưng càng kém nét.
3. Nếu muốn thu nhỏ kích thước, nhập **Chiều rộng tối đa (px)**, ví dụ 1600. Ảnh giữ nguyên tỉ lệ và không bao giờ bị phóng to nếu vốn đã nhỏ hơn.
4. Chọn **Định dạng**: **JPEG**, **WebP** hoặc **PNG**.
5. Xem dung lượng gốc, dung lượng mới và phần trăm giảm của từng ảnh, rồi bấm **Tải về**.

## Chọn định dạng nào?

| Định dạng | Phù hợp với | Lưu ý |
| --- | --- | --- |
| JPEG | Ảnh chụp, ảnh gửi qua chat, email, biểu mẫu | Mọi nơi đều nhận, mất nền trong suốt (tô trắng) |
| WebP | Ảnh cho website, ảnh cần nhẹ nhất | Thường nhẹ hơn JPEG ở cùng độ nét, giữ được nền trong suốt |
| PNG | Ảnh chụp màn hình, logo, hình có chữ | Không mất dữ liệu, bỏ qua thanh Chất lượng, nặng với ảnh chụp |

## Khi nào cần nén ảnh?

- **Nộp hồ sơ, biểu mẫu online:** nhiều trang chỉ cho tải ảnh dưới một dung lượng nhất định. Giảm **Chất lượng** hoặc **Chiều rộng tối đa (px)** cho đến khi ảnh vừa giới hạn.
- **Làm website nhanh hơn:** ảnh nhẹ giúp trang tải nhanh hơn, nhất là trên điện thoại. Chiều rộng 1200 đến 1920 px thường đủ cho hầu hết bố cục.
- **Gửi qua chat hoặc email:** ảnh nhỏ gửi nhanh hơn, không vượt giới hạn tệp đính kèm và đỡ tốn dung lượng cho người nhận.

## An toàn và riêng tư

Mọi thao tác diễn ra trên trình duyệt bằng Canvas API, ảnh không bao giờ được tải lên máy chủ. Ảnh đầu ra cũng bị loại bỏ dữ liệu EXIF, bao gồm vị trí GPS, nên bạn yên tâm hơn khi đăng ảnh lên mạng.

> Lưu ý: ảnh HEIC từ iPhone chưa được hỗ trợ. Hãy chuyển sang JPG trên điện thoại trước khi nén.

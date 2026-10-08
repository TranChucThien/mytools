---
faq:
  - q: "Bỏ dấu tiếng Việt online như thế nào?"
    a: "Dán văn bản có dấu vào ô nhập liệu, kết quả không dấu hiện ngay bên dưới. Bấm Sao chép để lấy kết quả. Ví dụ \"Nguyễn Văn Đức\" thành \"Nguyen Van Duc\"."
  - q: "Chữ đ và Đ được chuyển thành gì?"
    a: "Chữ đ được chuyển thành d và Đ thành D. Đây là chữ cái riêng chứ không phải chữ d có dấu, nên nhiều công cụ đơn giản bỏ sót, còn công cụ này xử lý đầy đủ."
  - q: "Chữ hoa, chữ thường có bị thay đổi không?"
    a: "Không. Công cụ chỉ bỏ dấu, giữ nguyên chữ hoa, chữ thường, số, dấu câu và khoảng trắng như văn bản gốc."
  - q: "Văn bản copy từ Word hoặc từ macOS có bỏ dấu được không?"
    a: "Được. Tiếng Việt có thể được lưu ở dạng Unicode dựng sẵn (NFC) hoặc tổ hợp (NFD, dấu tách riêng khỏi chữ cái). Công cụ xử lý được cả hai dạng nên kết quả luôn sạch dấu."
  - q: "Dùng chữ không dấu vào việc gì?"
    a: "Thường dùng để đặt tên đăng nhập, tên file, đường dẫn URL, nhắn SMS không dấu cho đỡ tốn tin, hoặc chuẩn hóa họ tên để so khớp dữ liệu giữa các hệ thống."
  - q: "Nội dung tôi dán có bị lưu lại không?"
    a: "Không. Việc bỏ dấu diễn ra hoàn toàn trên trình duyệt của bạn, văn bản không được gửi lên máy chủ nào."
---

## Cách bỏ dấu tiếng Việt

1. Gõ hoặc dán văn bản có dấu vào ô nhập liệu.
2. Văn bản không dấu hiện ra ngay khi bạn gõ.
3. Bấm **Sao chép** để dán kết quả vào nơi bạn cần.

Công cụ giữ nguyên chữ hoa, chữ thường, số và dấu câu, chỉ bỏ các dấu thanh (sắc, huyền, hỏi, ngã, nặng), dấu mũ, dấu móc, dấu trăng và chuyển **đ → d**, **Đ → D**.

## Ví dụ chuyển đổi

| Có dấu | Không dấu |
| --- | --- |
| Nguyễn Văn Đức | Nguyen Van Duc |
| Thành phố Hồ Chí Minh | Thanh pho Ho Chi Minh |
| Trường Đại học Bách khoa | Truong Dai hoc Bach khoa |
| Báo cáo tháng 10.xlsx | Bao cao thang 10.xlsx |

## Khi nào cần bỏ dấu?

- **Tên đăng nhập, email:** nhiều hệ thống không nhận ký tự có dấu.
- **Tên file:** file có dấu dễ bị lỗi font khi gửi qua email, nén file hoặc chuyển giữa Windows và macOS.
- **Đường dẫn URL:** viết slug không dấu cho bài viết, ví dụ `cach-lam-banh-mi`.
- **Nhắn SMS:** tin nhắn có dấu bị giới hạn ít ký tự hơn mỗi tin, gửi không dấu giúp đỡ bị tách thành nhiều tin.
- **So khớp dữ liệu:** chuẩn hóa họ tên, địa chỉ trước khi tìm trùng trong Excel hoặc cơ sở dữ liệu.

## Unicode dựng sẵn và tổ hợp

Cùng một chữ "ế" có thể được lưu thành một ký tự duy nhất (dạng dựng sẵn, **NFC**) hoặc chữ "e" kèm các dấu tách rời (dạng tổ hợp, **NFD**), thường gặp khi copy từ macOS hay một số phần mềm cũ. Bằng mắt thường hai dạng trông giống hệt nhau. Công cụ xử lý được cả hai, nên văn bản lấy từ nguồn nào cũng được bỏ dấu sạch.

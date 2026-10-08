---
faq:
  - q: "Slug là gì?"
    a: "Slug là phần cuối của đường dẫn (URL) dùng để nhận diện một trang, ví dụ trong địa chỉ example.com/huong-dan-nau-pho-bo thì slug là huong-dan-nau-pho-bo. Slug tốt thì ngắn, dễ đọc và mô tả đúng nội dung trang."
  - q: "Công cụ xử lý chữ tiếng Việt có dấu như thế nào?"
    a: "Mọi dấu thanh và dấu mũ đều được bỏ, ví dụ \"phở\" thành \"pho\", \"Hà Nội\" thành \"ha-noi\". Riêng chữ đ và Đ được chuyển thành d."
  - q: "Nên dùng dấu gạch ngang hay gạch dưới?"
    a: "Nên dùng dấu gạch ngang (-). Google khuyến nghị dùng gạch ngang để ngăn cách các từ trong URL vì nó được hiểu là khoảng trắng giữa hai từ. Gạch dưới (_) thường chỉ dùng khi hệ thống của bạn bắt buộc."
  - q: "Ký tự đặc biệt như dấu chấm than, dấu phẩy sẽ ra sao?"
    a: "Mọi ký tự không phải chữ cái hoặc chữ số đều được thay bằng dấu phân cách. Nhiều dấu phân cách liền nhau được gộp thành một, và dấu phân cách ở đầu hoặc cuối được cắt bỏ."
  - q: "Slug nên dài bao nhiêu?"
    a: "Không có giới hạn bắt buộc, nhưng nên giữ ngắn gọn, khoảng 3 đến 6 từ chứa từ khóa chính là đủ. Slug ngắn dễ đọc, dễ chia sẻ và không bị cắt khi hiển thị."
  - q: "Đổi slug của bài viết đã đăng có sao không?"
    a: "Đổi slug sẽ làm thay đổi URL, các liên kết cũ có thể bị lỗi 404. Nếu buộc phải đổi, hãy cài chuyển hướng 301 từ URL cũ sang URL mới."
---

## Cách tạo slug từ tiêu đề

1. Dán tiêu đề bài viết, tên sản phẩm hoặc danh mục vào ô nhập.
2. Chọn **Dấu phân cách**: `-` (khuyên dùng) hoặc `_`.
3. Slug hiện ra ngay lập tức, sao chép và dán vào ô đường dẫn trong trình quản trị website của bạn.

## Công cụ chuyển đổi như thế nào?

Ví dụ với tiêu đề "Hướng dẫn nấu phở bò Hà Nội!":

1. Chuyển về chữ thường: "hướng dẫn nấu phở bò hà nội!"
2. Bỏ dấu tiếng Việt, đ thành d: "huong dan nau pho bo ha noi!"
3. Thay khoảng trắng và ký tự đặc biệt bằng dấu phân cách, gộp các dấu phân cách liền nhau, cắt ở hai đầu.

Kết quả: `huong-dan-nau-pho-bo-ha-noi`

| Tiêu đề | Slug |
| --- | --- |
| Top 10 món ăn Đà Nẵng | top-10-mon-an-da-nang |
| Giá vàng hôm nay (cập nhật) | gia-vang-hom-nay-cap-nhat |
| Áo thun nam - cổ tròn | ao-thun-nam-co-tron |

## Vì sao nên dùng dấu gạch ngang?

Công cụ tìm kiếm hiểu dấu gạch ngang là ranh giới giữa các từ, nên `nau-pho-bo` được đọc thành ba từ "nau", "pho", "bo". Google cũng khuyến nghị dùng gạch ngang thay cho gạch dưới trong URL. Ngoài ra, URL có gạch ngang dễ đọc hơn khi chia sẻ qua tin nhắn hay mạng xã hội.

## Mẹo đặt slug chuẩn SEO

- **Ngắn gọn, có từ khóa chính**: `nau-pho-bo` tốt hơn cả câu tiêu đề dài.
- **Bỏ bớt từ thừa** khi hợp lý, ví dụ "của", "và", "những", "các", miễn là slug vẫn rõ nghĩa.
- **Không ghi năm hay ngày** nếu bài viết sẽ được cập nhật lâu dài.
- **Đặt slug một lần và giữ nguyên**, tránh đổi sau khi bài đã có lượt truy cập.

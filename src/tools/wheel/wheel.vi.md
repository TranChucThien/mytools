---
faq:
  - q: "Vòng quay may mắn có công bằng không?"
    a: "Có. Người trúng được chọn trước bằng bộ sinh số ngẫu nhiên an toàn của trình duyệt (crypto.getRandomValues), sau đó vòng quay mới chạy hiệu ứng để dừng đúng ô đó. Mỗi mục có một ô bằng nhau nên cơ hội trúng như nhau."
  - q: "Hiệu ứng quay có ảnh hưởng tới kết quả không?"
    a: "Không. Kết quả đã được quyết định trước khi vòng quay bắt đầu chạy. Tốc độ quay, số vòng hay lúc bạn bấm nút đều không làm thay đổi xác suất."
  - q: "Làm sao để một người không trúng hai lần?"
    a: "Tích ô Loại mục đã trúng. Sau mỗi lần quay, mục vừa trúng sẽ bị bỏ khỏi vòng quay, phù hợp khi bạn quay nhiều giải liên tiếp."
  - q: "Nếu một mục được ghi hai lần thì sao?"
    a: "Mỗi dòng là một ô riêng trên vòng quay, nên mục ghi hai lần sẽ có hai ô và gấp đôi cơ hội trúng. Nếu muốn mọi người ngang nhau, hãy để mỗi người một dòng."
  - q: "Có dùng vòng quay khi livestream được không?"
    a: "Được. Dán danh sách người tham gia, chia sẻ màn hình rồi bấm Quay để người xem cùng theo dõi. Kết quả hiện ngay dưới vòng quay."
  - q: "Danh sách của tôi có bị gửi đi đâu không?"
    a: "Không. Mọi xử lý chạy trên trình duyệt của bạn, danh sách không được gửi lên máy chủ và không lưu lại."
---

## Cách dùng vòng quay may mắn

1. Nhập các lựa chọn vào ô **Danh sách (mỗi dòng một mục)**: tên người, món ăn, phần quà...
2. Tích **Loại mục đã trúng** nếu muốn mỗi mục chỉ trúng một lần.
3. Bấm **Quay** và chờ vòng quay dừng lại.
4. Xem kết quả hiện ngay bên dưới vòng quay.

## Vòng quay chọn kết quả thế nào?

Khác với cảm giác "may rủi theo tay quay", công cụ chọn người trúng **trước** bằng crypto.getRandomValues, bộ sinh số ngẫu nhiên an toàn của trình duyệt. Sau đó vòng quay mới chạy hiệu ứng và dừng đúng ô đã chọn. Vì vậy hiệu ứng chỉ để xem cho vui, không ảnh hưởng tới sự công bằng.

Mỗi mục được chia một ô bằng nhau trên vòng quay:

| Số mục | Cơ hội trúng của mỗi mục |
| --- | --- |
| 4 | 1/4 |
| 5 | 1/5 |
| 10 | 1/10 |

## Dùng vòng quay may mắn vào việc gì?

- **Minigame livestream, giveaway**: quay chọn người trúng thưởng trực tiếp trước người xem.
- **Lớp học**: quay gọi tên học sinh trả bài, chọn câu hỏi hay chủ đề thuyết trình.
- **Hôm nay ăn gì**: liệt kê vài quán hoặc món, để vòng quay quyết định giúp.
- **Hoạt động nhóm, công ty**: chọn người trình bày, quay thưởng cuối buổi họp, tiệc tất niên.

## Mẹo để quay thưởng minh bạch

- Công khai danh sách trước khi quay để mọi người kiểm tra tên mình.
- Chia sẻ hoặc quay màn hình trong lúc bấm **Quay**.
- Với nhiều giải, bật **Loại mục đã trúng** và quay từ giải nhỏ đến giải lớn.

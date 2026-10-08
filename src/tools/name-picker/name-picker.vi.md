---
faq:
  - q: "Bốc thăm ngẫu nhiên có công bằng không?"
    a: "Có. Công cụ dùng bộ sinh số ngẫu nhiên an toàn của trình duyệt (crypto.getRandomValues) và kỹ thuật lấy mẫu không thiên vị, nên mỗi dòng trong danh sách có cơ hội trúng như nhau."
  - q: "Nếu một tên xuất hiện hai lần trong danh sách thì sao?"
    a: "Mỗi dòng được tính là một lượt riêng, nên tên ghi hai lần sẽ có gấp đôi cơ hội trúng. Bạn có thể tận dụng điều này để chia lượt theo trọng số, ví dụ người mua 3 sản phẩm được ghi tên 3 lần."
  - q: "Dòng trống trong danh sách có bị tính không?"
    a: "Không. Các dòng trống được bỏ qua, nên bạn có thể dán danh sách từ bảng tính hay tin nhắn mà không cần dọn dẹp kỹ."
  - q: "Làm sao để bốc nhiều giải mà một người không trúng hai lần?"
    a: "Nhập số người cần chọn vào ô Số người được chọn, hoặc bật Loại người đã trúng khỏi danh sách rồi bốc từng giải một. Người đã trúng sẽ bị xóa khỏi danh sách cho lượt bốc tiếp theo."
  - q: "Có giới hạn số lượng tên không?"
    a: "Bạn có thể dán danh sách dài như danh sách lớp hay danh sách người bình luận. Mọi xử lý chạy trên trình duyệt nên tốc độ phụ thuộc vào máy của bạn."
  - q: "Danh sách tên có bị gửi đi đâu không?"
    a: "Không. Danh sách chỉ được xử lý trên trình duyệt của bạn, không gửi lên máy chủ và không lưu lại."
---

## Cách bốc thăm ngẫu nhiên

1. Dán hoặc gõ tên vào ô **Danh sách (mỗi dòng một tên)**. Dòng trống sẽ tự được bỏ qua.
2. Nhập **Số người được chọn**: bao nhiêu người trúng trong một lượt bốc.
3. Tích **Loại người đã trúng khỏi danh sách** nếu muốn bốc nhiều lượt mà không ai trúng hai lần.
4. Bấm **Bốc thăm** và công bố kết quả.

## Cơ chế bốc thăm

Mỗi dòng không trống trong danh sách là một "lá thăm". Công cụ dùng crypto.getRandomValues, bộ sinh số ngẫu nhiên an toàn của trình duyệt, cùng kỹ thuật lấy mẫu loại bỏ để tránh độ lệch, nên mọi lá thăm có xác suất bằng nhau.

Tên trùng **không** bị gộp lại. Điều này giúp bạn bốc thăm theo trọng số:

| Danh sách | Cơ hội trúng khi bốc 1 người |
| --- | --- |
| An, Bình, Chi, Dũng | Mỗi người 1/4 |
| An, An, Bình, Chi | An 2/4, Bình 1/4, Chi 1/4 |

Nếu không muốn trùng, hãy kiểm tra để mỗi người chỉ có một dòng.

## Dùng bốc thăm vào việc gì?

- **Trong lớp học**: gọi học sinh lên bảng, chọn nhóm thuyết trình trước.
- **Minigame, giveaway**: chọn người trúng thưởng từ danh sách bình luận, người tham gia livestream.
- **Phân công việc nhóm**: ai trực nhật, ai làm biên bản cuộc họp.
- **Chuyện vui hằng ngày**: ai bao cà phê, ai đi mua đồ ăn trưa.

## Mẹo để bốc thăm minh bạch

- Công khai danh sách trước khi bốc để mọi người kiểm tra tên mình.
- Quay màn hình hoặc chia sẻ màn hình trong lúc bấm **Bốc thăm**.
- Với nhiều giải, bốc từ giải nhỏ đến giải lớn và bật **Loại người đã trúng khỏi danh sách** để không ai trúng hai giải.

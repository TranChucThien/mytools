---
faq:
  - q: "Chia đội ngẫu nhiên có công bằng không?"
    a: "Có. Danh sách thành viên được xáo trộn bằng bộ sinh số ngẫu nhiên an toàn của trình duyệt (crypto.getRandomValues), nên mọi cách xếp đội đều có khả năng xảy ra như nhau, không ai được ưu tiên vào đội nào."
  - q: "Nếu số người không chia hết cho số đội thì sao?"
    a: "Thành viên được chia lần lượt vào từng đội như chia bài, nên các đội chênh nhau tối đa 1 người. Ví dụ 10 người chia 3 đội sẽ được 4, 3 và 3 người."
  - q: "Chia theo số đội và chia theo số người mỗi đội khác nhau thế nào?"
    a: "Chia theo số đội: bạn quyết định có bao nhiêu đội, công cụ tính số người mỗi đội. Chia theo số người mỗi đội: bạn đặt sĩ số mong muốn, công cụ tính số đội cần có. Ví dụ 10 người, mỗi đội 4 người sẽ thành 3 đội gồm 4, 3 và 3 người."
  - q: "Không vừa ý kết quả thì có chia lại được không?"
    a: "Được. Bấm Chia đội lần nữa để xáo trộn lại từ đầu. Nếu cần minh bạch, hãy thống nhất với cả nhóm trước là chỉ chia một lần."
  - q: "Có chia được cho lớp học hoặc công ty đông người không?"
    a: "Được. Bạn có thể dán cả danh sách lớp hoặc danh sách nhân viên, mỗi dòng một người. Mọi xử lý chạy trên trình duyệt nên tốc độ phụ thuộc vào máy của bạn."
  - q: "Danh sách thành viên có bị lưu lại không?"
    a: "Không. Danh sách chỉ được xử lý trên trình duyệt của bạn, không gửi lên máy chủ và không lưu lại."
---

## Cách chia đội ngẫu nhiên

1. Dán tên vào ô **Danh sách thành viên (mỗi dòng một người)**.
2. Chọn cách chia: **Chia theo số đội** hoặc **Chia theo số người mỗi đội**.
3. Nhập **Số đội** hoặc **Số người mỗi đội** tùy theo cách chia đã chọn.
4. Bấm **Chia đội** và đọc danh sách từng đội.

## Công cụ chia đội thế nào?

Đầu tiên, toàn bộ danh sách được xáo trộn bằng crypto.getRandomValues, bộ sinh số ngẫu nhiên an toàn của trình duyệt. Sau đó thành viên được chia lần lượt vào từng đội, giống như chia bài, nên sĩ số các đội chênh nhau không quá 1 người.

| Danh sách | Cách chia | Kết quả |
| --- | --- | --- |
| 10 người | 3 đội | 4, 3, 3 người |
| 12 người | 3 đội | 4, 4, 4 người |
| 14 người | 4 đội | 4, 4, 3, 3 người |
| 10 người | Mỗi đội 4 người | 3 đội: 4, 3, 3 người |

## Dùng chia đội ngẫu nhiên vào việc gì?

- **Đá bóng, cầu lông, bóng chuyền**: chia hai đội nhanh gọn ở sân, không ai phải chọn người.
- **Lớp học**: chia nhóm làm bài tập, thảo luận, thuyết trình mà không bị chia theo nhóm bạn thân.
- **Team building công ty**: trộn nhân viên các phòng ban để mọi người làm quen nhau.
- **Trò chơi, sự kiện**: chia đội cho trò chơi tập thể, cắm trại, dã ngoại.

## Mẹo chia đội vui và công bằng

- Thống nhất cách chia và số đội trước khi bấm **Chia đội**.
- Chiếu hoặc chia sẻ màn hình để cả nhóm cùng xem kết quả.
- Nếu cần cân bằng trình độ, có thể chia riêng nhóm người chơi giỏi trước rồi chia tiếp những người còn lại.

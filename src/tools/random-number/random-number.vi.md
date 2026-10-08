---
faq:
  - q: Số được tạo ra có thật sự ngẫu nhiên không?
    a: Công cụ dùng crypto.getRandomValues – bộ sinh số ngẫu nhiên an toàn mật mã có sẵn trong trình duyệt – kèm kỹ thuật lấy mẫu loại bỏ để mọi số trong khoảng có xác suất xuất hiện như nhau, không thiên vị số nào.
  - q: Làm sao để random nhiều số không trùng nhau?
    a: Nhập số lượng cần lấy và giữ dấu tích ở ô "Không trùng lặp". Ví dụ muốn chọn 6 số từ 1 đến 45 như xổ số Vietlott Mega 6/45, nhập Từ 1, Đến 45, Số lượng 6.
  - q: Có thể dùng công cụ để bốc thăm trúng thưởng không?
    a: Được. Đánh số thứ tự cho người tham gia (ví dụ 1 đến 250), rồi random số lượng người trúng giải với tùy chọn không trùng lặp. Nên quay màn hình khi bốc thăm để minh bạch.
  - q: Khoảng số lớn nhất là bao nhiêu?
    a: Bạn có thể dùng số nguyên âm hoặc dương rất lớn (tới khoảng 9 triệu tỷ) và lấy tối đa 1.000 số mỗi lần.
  - q: Công cụ có lưu lại kết quả không?
    a: Không. Mọi thứ chạy trên trình duyệt của bạn và không có dữ liệu nào được gửi lên máy chủ.
---

## Cách tạo số ngẫu nhiên

1. Nhập **Từ số** và **Đến số** – khoảng giá trị bạn muốn (bao gồm cả hai đầu).
2. Nhập **Số lượng** số cần tạo (1 đến 1.000).
3. Giữ tích **Không trùng lặp** nếu mỗi số chỉ được xuất hiện một lần.
4. Bấm **Tạo số**. Bấm lại bao nhiêu lần tùy thích để random lượt mới.

## Các cách dùng phổ biến

- **Bốc thăm, quay số trúng thưởng** cho livestream, minigame, sự kiện công ty.
- **Gọi tên ngẫu nhiên** trong lớp học theo số thứ tự.
- **Chọn số xổ số** tham khảo cho Vietlott 6/45, 6/55.
- **Chia đội, xếp thứ tự** thi đấu, thuyết trình.
- **Chơi game** – thay xúc xắc (khoảng 1 đến 6) hay tung đồng xu (1 đến 2).

## Vì sao công cụ này công bằng?

Nhiều trang dùng `Math.random()` – một hàm không được thiết kế cho mục đích công bằng. Công cụ này dùng bộ sinh số ngẫu nhiên an toàn của trình duyệt, đồng thời loại bỏ "độ lệch modulo" để không có con số nào được ưu ái hơn số khác.

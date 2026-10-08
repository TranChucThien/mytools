---
faq:
  - q: "Mật khẩu tạo ra có an toàn không?"
    a: "Có. Mật khẩu được tạo ngay trên trình duyệt bằng crypto.getRandomValues, bộ sinh số ngẫu nhiên an toàn mật mã. Mật khẩu không bao giờ được gửi lên máy chủ hay lưu lại ở bất kỳ đâu."
  - q: "Nên đặt mật khẩu dài bao nhiêu ký tự?"
    a: "Tối thiểu 12 ký tự cho tài khoản thông thường, và 16 ký tự trở lên cho email, ngân hàng, tài khoản quản trị. Công cụ mặc định 16 ký tự và cho phép tạo từ 4 đến 128 ký tự."
  - q: "Entropy (bit) là gì?"
    a: "Entropy đo độ khó đoán của mật khẩu, tính bằng độ dài nhân với log2 của số ký tự có thể dùng. Mỗi bit tăng thêm làm số khả năng phải thử tăng gấp đôi, nên entropy càng cao thì càng khó bẻ khóa."
  - q: "Bỏ ký tự dễ nhầm có làm mật khẩu yếu đi không?"
    a: "Có giảm một chút vì bớt 6 ký tự (l, 1, I, O, 0, o) khỏi tập ký tự. Ví dụ 16 ký tự gồm chữ thường, chữ hoa và chữ số giảm từ khoảng 95,3 bit xuống 92,9 bit, vẫn rất mạnh. Tùy chọn này hữu ích khi bạn phải đọc hoặc gõ lại mật khẩu bằng tay."
  - q: "Mật khẩu có chắc chắn chứa đủ các loại ký tự đã chọn không?"
    a: "Có. Mỗi mật khẩu luôn có ít nhất một ký tự từ mỗi nhóm bạn đã tích, ví dụ chọn chữ hoa và chữ số thì mật khẩu chắc chắn có ít nhất một chữ hoa và một chữ số."
  - q: "Làm sao nhớ được mật khẩu ngẫu nhiên dài như vậy?"
    a: "Bạn không cần nhớ. Hãy lưu mật khẩu vào một trình quản lý mật khẩu uy tín, chỉ cần nhớ một mật khẩu chính thật mạnh, và bật xác thực hai lớp (2FA) cho các tài khoản quan trọng."
---

## Cách tạo mật khẩu mạnh

1. Chọn **Độ dài** từ 4 đến 128 ký tự (mặc định 16).
2. Tích các nhóm ký tự muốn dùng: **Chữ thường (a-z)**, **Chữ hoa (A-Z)**, **Chữ số (0-9)**, **Ký tự đặc biệt**.
3. Tích **Bỏ ký tự dễ nhầm** nếu bạn cần đọc hay gõ lại mật khẩu bằng tay.
4. Bấm **Tạo mật khẩu mới** cho tới khi ưng ý, rồi sao chép và lưu lại ngay.

Độ mạnh được hiển thị dưới dạng entropy (số bit) kèm nhãn đánh giá.

## Cách tính độ mạnh (entropy)

Công thức: **entropy = độ dài × log2(số ký tự có thể dùng)**.

Ví dụ mật khẩu 16 ký tự gồm chữ thường (26), chữ hoa (26) và chữ số (10), tổng cộng 62 ký tự:

16 × log2(62) ≈ 16 × 5,954 ≈ **95,3 bit**

Nghĩa là có khoảng 2^95 mật khẩu khác nhau có thể được tạo ra, quá nhiều để thử từng cái.

## Vì sao độ dài quan trọng hơn độ phức tạp?

| Mật khẩu | Tập ký tự | Entropy |
| --- | --- | --- |
| 8 ký tự | a-z, A-Z, 0-9 (62) | khoảng 47,6 bit |
| 12 ký tự | a-z, A-Z, 0-9 (62) | khoảng 71,5 bit |
| 16 ký tự | chỉ a-z (26) | khoảng 75,2 bit |
| 20 ký tự | chỉ a-z (26) | khoảng 94,0 bit |

Mật khẩu 16 chữ thường mạnh hơn mật khẩu 8 ký tự trộn đủ loại. Mỗi ký tự thêm vào nhân số khả năng lên nhiều lần, còn thêm loại ký tự chỉ tăng nhẹ mỗi ký tự. Vì vậy hãy ưu tiên tăng độ dài trước.

## Mẹo bảo vệ tài khoản

- **Mỗi tài khoản một mật khẩu riêng**: lộ một mật khẩu sẽ không kéo theo các tài khoản khác.
- **Dùng trình quản lý mật khẩu** để lưu và tự điền, thay vì ghi ra giấy hay lưu trong ghi chú điện thoại.
- **Bật xác thực hai lớp (2FA)** cho email, ngân hàng và mạng xã hội. Ưu tiên ứng dụng xác thực hoặc khóa bảo mật hơn mã SMS khi có thể.
- **Không gửi mật khẩu qua tin nhắn** hay email. Nếu nghi bị lộ, đổi ngay mật khẩu mới.

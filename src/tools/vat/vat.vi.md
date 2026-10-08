---
faq:
  - q: "Cách tính thuế VAT 10% như thế nào?"
    a: "Lấy giá chưa VAT nhân 10% để ra tiền thuế, rồi cộng vào giá chưa VAT. Ví dụ hàng giá 1.000.000đ chưa thuế thì tiền VAT là 100.000đ và giá đã có VAT là 1.100.000đ."
  - q: "Làm sao tách VAT từ giá đã bao gồm thuế?"
    a: "Lấy giá đã có VAT chia cho (1 + thuế suất) để ra giá chưa VAT, rồi lấy hai số trừ nhau để ra tiền thuế. Ví dụ 1.100.000đ đã gồm VAT 10% thì giá chưa VAT là 1.100.000 ÷ 1,1 = 1.000.000đ, tiền thuế 100.000đ."
  - q: "Tại sao không lấy giá đã có VAT nhân 10% để ra tiền thuế?"
    a: "Vì 10% được tính trên giá chưa thuế, không phải trên giá đã có thuế. Lấy 1.100.000 × 10% ra 110.000đ là sai, tiền thuế đúng chỉ là 100.000đ."
  - q: "Thuế suất VAT ở Việt Nam hiện nay là bao nhiêu?"
    a: "Mức phổ biến là 10%. Một số hàng hóa, dịch vụ chịu mức 5%. Ngoài ra, theo các chính sách giảm thuế tạm thời của Nhà nước, một số nhóm hàng hóa, dịch vụ được áp dụng mức 8% thay cho 10%. Bạn nên kiểm tra quy định đang có hiệu lực tại thời điểm xuất hóa đơn."
  - q: "Tôi muốn dùng thuế suất khác 5%, 8%, 10% được không?"
    a: "Được. Chọn tùy chỉnh ở ô Thuế suất rồi nhập mức thuế bạn cần, công cụ sẽ tính theo đúng mức đó."
  - q: "Công cụ tính VAT có miễn phí không?"
    a: "Hoàn toàn miễn phí, không cần đăng ký. Mọi phép tính chạy trên trình duyệt, số liệu không được gửi đi đâu."
---

## Cách dùng công cụ tính VAT

1. Nhập **Số tiền**.
2. Chọn **Thuế suất**: 5%, 8%, 10% hoặc tự nhập mức khác.
3. Chọn chế độ:
   - **Cộng VAT**: số tiền bạn nhập là giá chưa thuế, công cụ cộng thêm thuế.
   - **Tách VAT**: số tiền bạn nhập là giá đã gồm thuế, công cụ tách ra phần thuế.
4. Xem kết quả **Tiền thuế**, **Giá chưa VAT** và **Giá đã có VAT**.

## Công thức tính VAT

| Chế độ | Công thức |
| --- | --- |
| Cộng VAT | `Tiền thuế = Giá chưa VAT × Thuế suất` |
| | `Giá đã có VAT = Giá chưa VAT × (1 + Thuế suất)` |
| Tách VAT | `Giá chưa VAT = Giá đã có VAT ÷ (1 + Thuế suất)` |
| | `Tiền thuế = Giá đã có VAT − Giá chưa VAT` |

**Lỗi hay gặp khi tách VAT:** lấy giá đã có thuế nhân 10%. Với giá 1.100.000đ, cách này ra 110.000đ tiền thuế và 990.000đ giá chưa thuế, sai cả hai. Thuế 10% được tính trên giá chưa thuế, nên phải chia 1.100.000 cho 1,1 để ra 1.000.000đ, tiền thuế đúng là 100.000đ.

## Ví dụ thực tế

- **Báo giá cho khách (10%):** dịch vụ 1.000.000đ chưa thuế → VAT 100.000đ, tổng thanh toán 1.100.000đ.
- **Tách thuế từ hóa đơn (8%):** hóa đơn tổng 2.160.000đ đã gồm VAT 8% → giá chưa VAT 2.160.000 ÷ 1,08 = 2.000.000đ, tiền thuế 160.000đ.
- **Cộng thuế mức 8%:** hàng 500.000đ chưa thuế → giá đã có VAT 540.000đ.

> Lưu ý: mức 8% chỉ áp dụng cho một số hàng hóa, dịch vụ trong thời gian chính sách giảm thuế còn hiệu lực. Trước khi xuất hóa đơn, hãy kiểm tra văn bản hiện hành hoặc hỏi kế toán để chọn đúng thuế suất.

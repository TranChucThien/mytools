---
faq:
  - q: "Lương Gross và lương Net khác nhau thế nào?"
    a: "Lương Gross là tổng thu nhập ghi trong hợp đồng, trước khi trừ bảo hiểm và thuế. Lương Net là số tiền thực nhận về tài khoản sau khi đã trừ BHXH, BHYT, BHTN phần người lao động đóng và thuế thu nhập cá nhân. Ví dụ Gross 30.000.000đ, không có người phụ thuộc, Vùng I thì Net là 26.215.000đ."
  - q: "Người lao động phải đóng bảo hiểm bao nhiêu phần trăm?"
    a: "Tổng cộng 10,5% trên lương đóng bảo hiểm: BHXH 8%, BHYT 1,5% và BHTN 1%. BHXH và BHYT tính trên mức tối đa 50.600.000đ/tháng (20 lần lương cơ sở 2.530.000đ). BHTN tính trên mức tối đa 20 lần lương tối thiểu vùng, ví dụ 106.200.000đ/tháng ở Vùng I."
  - q: "Mức giảm trừ gia cảnh năm 2026 là bao nhiêu?"
    a: "Từ kỳ tính thuế năm 2026, mức giảm trừ cho bản thân người nộp thuế là 15.500.000đ/tháng và cho mỗi người phụ thuộc là 6.200.000đ/tháng, thay cho mức cũ 11 triệu và 4,4 triệu đồng."
  - q: "Biểu thuế TNCN từ tiền lương hiện nay có mấy bậc?"
    a: "Biểu thuế lũy tiến từng phần áp dụng cho tiền lương của cá nhân cư trú có 5 bậc: đến 10 triệu đồng 5%, trên 10 đến 30 triệu đồng 10%, trên 30 đến 60 triệu đồng 20%, trên 60 đến 100 triệu đồng 30% và trên 100 triệu đồng 35%, tính trên thu nhập tính thuế mỗi tháng. Biểu này thay cho biểu 7 bậc trước đây."
  - q: "Vì sao cần chọn Vùng khi tính lương?"
    a: "Vùng quyết định mức lương tối thiểu vùng, từ đó quyết định mức trần đóng BHTN. Với người có lương đóng bảo hiểm thấp hơn trần, chọn vùng nào kết quả cũng như nhau. Khác biệt chỉ xuất hiện khi lương đóng bảo hiểm vượt mức trần BHTN của vùng."
  - q: "Kết quả có giống hệt bảng lương công ty không?"
    a: "Có thể chênh lệch. Công cụ chỉ ước tính cho cá nhân cư trú có hợp đồng lao động từ 3 tháng trở lên. Các khoản phụ cấp được miễn thuế như tiền ăn giữa ca trong giới hạn, thuế suất 20% cho cá nhân không cư trú và khấu trừ 10% với hợp đồng ngắn hạn không được tính. Hãy đối chiếu với phòng nhân sự hoặc tư vấn thuế."
---

## Cách dùng công cụ tính lương Gross sang Net

1. Chọn chế độ:
   - **Gross sang Net**: bạn biết lương trong hợp đồng và muốn biết số tiền thực nhận.
   - **Net sang Gross**: bạn muốn nhận một mức lương thực nhận cố định và cần biết lương Gross tương ứng để thương lượng.
2. Nhập **Lương Gross** (hoặc **Lương Net** nếu chọn chế độ Net sang Gross), ví dụ 30.000.000.
3. Nhập **Số người phụ thuộc** đã đăng ký giảm trừ gia cảnh, ví dụ 0, 1 hoặc 2.
4. Chọn **Vùng** nơi làm việc: I, II, III hoặc IV.
5. Nếu công ty đóng bảo hiểm trên mức thấp hơn lương thực tế, nhập **Lương đóng bảo hiểm**. Bỏ trống thì công cụ lấy bằng lương Gross.
6. Xem **Lương Net** (hoặc **Lương Gross**), **BHXH (8%)**, **BHYT (1,5%)**, **BHTN (1%)**, **Thu nhập tính thuế**, **Thuế TNCN** và bảng chi tiết tiền thuế theo từng bậc.

## Công thức tính lương Net

| Bước | Công thức |
| --- | --- |
| Bảo hiểm | `BHXH = 8% × min(Lương đóng BH, 50.600.000)` |
| | `BHYT = 1,5% × min(Lương đóng BH, 50.600.000)` |
| | `BHTN = 1% × min(Lương đóng BH, 20 × Lương tối thiểu vùng)` |
| Thu nhập tính thuế | `Gross − Bảo hiểm − 15.500.000 − 6.200.000 × Số người phụ thuộc` (không âm) |
| Thuế TNCN | Áp biểu lũy tiến 5 bậc lên thu nhập tính thuế |
| Lương Net | `Gross − Bảo hiểm − Thuế TNCN` |

Ở chế độ **Net sang Gross**, công cụ dò tìm mức Gross sao cho sau khi trừ bảo hiểm và thuế thì ra đúng số Net bạn nhập.

**Biểu thuế TNCN từ tiền lương (tính theo tháng):**

| Bậc | Thu nhập tính thuế/tháng | Thuế suất |
| --- | --- | --- |
| 1 | Đến 10 triệu đồng | 5% |
| 2 | Trên 10 đến 30 triệu đồng | 10% |
| 3 | Trên 30 đến 60 triệu đồng | 20% |
| 4 | Trên 60 đến 100 triệu đồng | 30% |
| 5 | Trên 100 triệu đồng | 35% |

**Mức trần đóng BHTN theo vùng (từ 01/01/2026):**

| Vùng | Lương tối thiểu vùng | Mức trần BHTN |
| --- | --- | --- |
| I | 5.310.000đ | 106.200.000đ |
| II | 4.730.000đ | 94.600.000đ |
| III | 4.140.000đ | 82.800.000đ |
| IV | 3.700.000đ | 74.000.000đ |

## Ví dụ tính lương thực tế

**Ví dụ 1: Gross 30.000.000đ, không có người phụ thuộc, Vùng I**

- Bảo hiểm: BHXH 2.400.000đ + BHYT 450.000đ + BHTN 300.000đ = 3.150.000đ.
- Thu nhập tính thuế: 30.000.000 − 3.150.000 − 15.500.000 = 11.350.000đ.
- Thuế TNCN: 10.000.000 × 5% + 1.350.000 × 10% = 500.000 + 135.000 = 635.000đ.
- Lương Net: 30.000.000 − 3.150.000 − 635.000 = **26.215.000đ**.

**Ví dụ 2: Gross 100.000.000đ, 1 người phụ thuộc, Vùng I**

- BHXH và BHYT tính trên mức trần 50.600.000đ: 4.048.000đ + 759.000đ = 4.807.000đ.
- BHTN tính trên 100.000.000đ (dưới trần 106.200.000đ): 1.000.000đ.
- Tổng bảo hiểm: 5.807.000đ.
- Thu nhập tính thuế: 100.000.000 − 5.807.000 − 15.500.000 − 6.200.000 = 72.493.000đ.

| Bậc | Phần thu nhập | Tiền thuế |
| --- | --- | --- |
| 1 (5%) | 10.000.000đ | 500.000đ |
| 2 (10%) | 20.000.000đ | 2.000.000đ |
| 3 (20%) | 30.000.000đ | 6.000.000đ |
| 4 (30%) | 12.493.000đ | 3.747.900đ |
| Tổng | 72.493.000đ | 12.247.900đ |

- Lương Net: 100.000.000 − 5.807.000 − 12.247.900 = **81.945.100đ**.

## Lưu ý khi dùng kết quả

Kết quả là số ước tính cho cá nhân cư trú có hợp đồng lao động từ 3 tháng trở lên. Công cụ chưa tính các khoản phụ cấp được miễn thuế (như tiền ăn giữa ca trong giới hạn cho phép), thuế suất toàn phần 20% với cá nhân không cư trú và mức khấu trừ 10% với hợp đồng dưới 3 tháng.

Mức trần BHXH, BHYT dùng trong công cụ là 50.600.000đ theo lương cơ sở 2.530.000đ áp dụng từ 01/07/2026. Từ 01/01 đến 30/06/2026, mức trần này là 46.800.000đ, nên bảng lương các tháng đầu năm 2026 có thể khác một chút với người lương cao.

> Lưu ý: quy định về bảo hiểm và thuế có thể thay đổi. Trang này phản ánh quy định tại thời điểm tháng 10/2026. Hãy đối chiếu với phòng nhân sự hoặc người tư vấn thuế trước khi ra quyết định.

**Căn cứ pháp lý:**

- Luật Thuế thu nhập cá nhân số 109/2025/QH15.
- Nghị quyết 110/2025/UBTVQH15 về điều chỉnh mức giảm trừ gia cảnh.
- Nghị định 161/2026/NĐ-CP quy định mức lương cơ sở.
- Nghị định 293/2025/NĐ-CP quy định mức lương tối thiểu vùng.

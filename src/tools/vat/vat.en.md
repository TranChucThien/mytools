---
faq:
  - q: "How do I add VAT to a price?"
    a: "Multiply the net price by the VAT rate to get the VAT amount, then add it to the net price. At 20% VAT, a 100 net price has 20 VAT and a gross price of 120."
  - q: "How do I remove VAT from a gross price?"
    a: "Divide the gross price by (1 + VAT rate) to get the net price, then subtract to find the VAT. At 20% VAT, 120 ÷ 1.2 = 100 net, so the VAT is 20."
  - q: "Why can't I just take 20% of the gross price?"
    a: "Because VAT is charged on the net price, not on the price that already includes VAT. 20% of 120 is 24, which overstates the tax. The correct VAT inside 120 is 20."
  - q: "What VAT rate should I use?"
    a: "It depends on the country and the type of goods or services. For example, the standard rate is 20% in the UK and 19% in Germany, and many countries have reduced rates for certain items. Check the current rules where you sell."
  - q: "Can I enter a custom VAT rate?"
    a: "Yes. Choose a custom rate in the VAT rate field and type any percentage. The calculator also has 5%, 8% and 10% presets."
  - q: "Is this VAT calculator free?"
    a: "Yes, completely free with no signup. All calculations run in your browser."
---

## How to use the VAT calculator

1. Enter the **Amount**.
2. Pick a **VAT rate**: 5%, 8%, 10% or a custom rate.
3. Choose a mode:
   - **Add VAT**: the amount is the net price and VAT is added on top.
   - **Remove VAT**: the amount already includes VAT and the calculator pulls the tax out.
4. Read the **VAT amount**, **Net price** and **Gross price**.

## VAT formulas

| Mode | Formula |
| --- | --- |
| Add VAT | `VAT amount = Net × rate` |
| | `Gross = Net × (1 + rate)` |
| Remove VAT | `Net = Gross ÷ (1 + rate)` |
| | `VAT amount = Gross − Net` |

**The most common mistake:** taking the VAT rate of the gross price. With a gross price of 120 at 20% VAT, 120 × 20% = 24, which is wrong. VAT was added to the net price, so you divide: 120 ÷ 1.2 = 100 net, and the VAT is 20.

## Examples

- **UK invoice (20%):** £100 net → £20 VAT, £120 gross.
- **German receipt (19%):** €119 including VAT → 119 ÷ 1.19 = €100 net, €19 VAT.
- **Quote at 10%:** 1,000 net → 100 VAT, 1,100 gross. Removing 10% VAT from 1,100 gives back 1,000, not 990.

> Tip: VAT rates and reduced-rate rules change from country to country and over time. Confirm the rate that applies to your product before you send an invoice.

---
faq:
  - q: "What is VietQR?"
    a: "VietQR is the shared standard for bank transfer QR codes in Vietnam, built on the EMVCo QR format and the NAPAS 247 fast transfer network. When someone scans a VietQR code with a Vietnamese banking app, the bank, account number and optionally the amount and message are filled in for them."
  - q: "Does it work with foreign bank accounts or international cards?"
    a: "No. VietQR only works with Vietnamese bank accounts, and the payer needs a Vietnamese banking app that can scan transfer QR codes. It is not a card payment or international transfer method."
  - q: "Can this tool send money or see my balance?"
    a: "No. It only draws a QR code containing your receiving details. It does not connect to any bank, cannot move money and cannot see balances or transactions."
  - q: "Why were the accents removed from my message?"
    a: "Many Vietnamese banks reject transfer messages with accented characters or long text. The tool removes accents automatically and limits the message to 50 characters so the code works across as many banking apps as possible."
  - q: "Should I include an amount?"
    a: "Include it when you are collecting one specific payment, such as an invoice, so the payer cannot mistype it. Leave it empty for a code you reuse, such as one at a shop counter, and the payer types the amount."
  - q: "Is my account number sent to a server?"
    a: "No. The QR code is generated entirely in your browser. Your account number and message are never uploaded or stored."
---

## How to create a VietQR code

1. Pick your **Bank** from the list of Vietnamese banks.
2. Enter your **Account number**.
3. Optionally fill in **Amount in VND (optional)** for a single fixed payment.
4. Optionally add a **Transfer message (optional)**, such as an invoice number or your customer's name.
5. Press **Download PNG**, then scan the code with your own banking app to confirm the account name before sharing it.

## What VietQR does and does not do

Bank transfers by QR code are everyday payments in Vietnam, from street food stalls to monthly rent. VietQR is the common format behind them, so one code can be read by most Vietnamese banking apps. The payer scans it, checks the prefilled details and confirms the transfer in their own app.

| You fill in | What the payer gets |
| --- | --- |
| Bank and account number only | Account prefilled, payer types the amount |
| Plus an amount | Amount prefilled for one payment |
| Plus a message | Message prefilled (accents removed, up to 50 characters) |

Keep in mind:

- It only works with **Vietnamese bank accounts**, paid from a Vietnamese banking app.
- The code holds receiving details only. The tool cannot move money or read your account.

## Who uses it

- **Foreigners living in Vietnam**: share a code with a landlord, tutor or friends instead of spelling out your account number.
- **Shops and cafes**: print a code without an amount for the counter.
- **Freelancers and small businesses**: put a code with the amount and invoice number on each invoice.
- **Splitting costs**: collect money for a group dinner or trip.

## Tips for using payment QR codes safely

- Always scan your code with your own banking app first and check that the account name shown is yours.
- Use a short, unique message such as an invoice number so payments are easy to match.
- Check printed codes at your counter regularly to make sure nobody has covered them with a different one.

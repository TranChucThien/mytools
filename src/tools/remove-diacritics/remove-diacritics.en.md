---
faq:
  - q: "How do I remove Vietnamese accents from text?"
    a: "Paste your Vietnamese text into the box and the unaccented version appears right away. Click Copy to grab it. For example, \"Nguyễn Văn Đức\" becomes \"Nguyen Van Duc\"."
  - q: "What happens to đ and Đ?"
    a: "đ becomes d and Đ becomes D. In Vietnamese, đ is a separate letter rather than a d with an accent mark, so generic accent removers often leave it untouched. This tool converts it."
  - q: "Does it change uppercase and lowercase letters?"
    a: "No. Only the diacritics are removed. Capitalization, numbers, punctuation and spacing stay exactly as in the original."
  - q: "Does it work with text copied from a Mac or from Word?"
    a: "Yes. Vietnamese text can be stored as precomposed Unicode (NFC) or decomposed Unicode (NFD), where accents are separate characters. The tool handles both forms."
  - q: "Why would I need text without accents?"
    a: "Common reasons include usernames, file names, URL slugs, sending SMS messages without accents and normalizing names so records match across systems."
  - q: "Is my text uploaded anywhere?"
    a: "No. The conversion runs entirely in your browser and your text is never sent to a server."
---

## How to remove Vietnamese accents

1. Type or paste text with Vietnamese accents into the input box.
2. The plain version without accents appears as you type.
3. Click **Copy** and paste the result wherever you need it.

All tone marks and vowel marks are stripped (for example ấ, ở, ữ become a, o, u), **đ** becomes **d** and **Đ** becomes **D**. Upper and lower case are preserved.

## Examples

| With accents | Without accents |
| --- | --- |
| Nguyễn Văn Đức | Nguyen Van Duc |
| Thành phố Hồ Chí Minh | Thanh pho Ho Chi Minh |
| Phở bò Hà Nội | Pho bo Ha Noi |
| Đà Nẵng | Da Nang |

## When to remove accents

- **Usernames and emails:** many systems reject accented characters.
- **File names:** accented names can break when zipped, emailed or moved between Windows and macOS.
- **URLs:** create clean slugs like `pho-bo-ha-noi`.
- **SMS:** messages with accents fit fewer characters per text, so plain text avoids splitting into several messages.
- **Data matching:** normalize Vietnamese names and addresses before deduplicating a spreadsheet or database, or when a booking form only accepts plain Latin letters.

## NFC and NFD Unicode

The same letter "ế" can be stored as a single precomposed character (**NFC**) or as a plain "e" followed by separate combining marks (**NFD**), which often happens with text copied from macOS or older software. Both look identical on screen. The tool handles both, so accents are removed cleanly whichever form you paste.

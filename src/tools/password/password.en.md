---
faq:
  - q: "Is this password generator safe to use?"
    a: "Yes. Passwords are generated locally in your browser with crypto.getRandomValues, a cryptographically secure random generator. They are never sent to a server or stored anywhere."
  - q: "How long should my password be?"
    a: "At least 12 characters for everyday accounts, and 16 or more for email, banking and admin accounts. The default here is 16, and you can choose anything from 4 to 128."
  - q: "What does entropy in bits mean?"
    a: "Entropy measures how hard a password is to guess. It is the length multiplied by log2 of the number of possible characters. Each extra bit doubles the number of guesses an attacker would need."
  - q: "Does excluding look-alike characters make passwords weaker?"
    a: "Slightly, because six characters (l, 1, I, O, 0, o) are removed from the pool. A 16-character password using lowercase, uppercase and numbers drops from about 95.3 bits to 92.9 bits, which is still very strong. It is worth it when you have to read or type a password by hand."
  - q: "Will the password always include every character type I selected?"
    a: "Yes. Every generated password contains at least one character from each set you checked, so selecting uppercase and numbers guarantees at least one of each."
  - q: "How am I supposed to remember a random password?"
    a: "You don't need to. Save it in a reputable password manager, remember one strong master password, and turn on two-factor authentication (2FA) for your important accounts."
---

## How to generate a strong password

1. Set the **Length** anywhere from 4 to 128 characters (16 by default).
2. Choose your character sets: **Lowercase (a-z)**, **Uppercase (A-Z)**, **Numbers (0-9)** and **Symbols**.
3. Check **Exclude look-alikes** if you will need to read or type the password by hand.
4. Press **Generate new** until you like the result, then copy it and save it right away.

Strength is shown as entropy in bits along with a label.

## How password strength is calculated

The formula: **entropy = length × log2(pool size)**, where the pool is the number of characters that can be used.

For a 16-character password using lowercase (26), uppercase (26) and numbers (10), the pool is 62 characters:

16 × log2(62) ≈ 16 × 5.954 ≈ **95.3 bits**

That means about 2^95 possible passwords, far too many to try one by one.

## Why length beats complexity

| Password | Character pool | Entropy |
| --- | --- | --- |
| 8 characters | a-z, A-Z, 0-9 (62) | about 47.6 bits |
| 12 characters | a-z, A-Z, 0-9 (62) | about 71.5 bits |
| 16 characters | a-z only (26) | about 75.2 bits |
| 20 characters | a-z only (26) | about 94.0 bits |

A 16-character lowercase-only password is stronger than an 8-character password with every character type. Each extra character multiplies the number of possibilities, while a bigger pool only adds a little per character. So make it longer first.

## Tips to keep your accounts safe

- **Use a unique password for every account**, so one leak doesn't expose the rest.
- **Use a password manager** to store and autofill passwords instead of notes or sticky notes.
- **Turn on two-factor authentication (2FA)** for email, banking and social media. Prefer an authenticator app or security key over SMS codes when you can.
- **Never share passwords** by chat or email, and change a password right away if you think it was exposed.

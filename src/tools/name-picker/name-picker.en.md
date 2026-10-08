---
faq:
  - q: "Is the random name picker fair?"
    a: "Yes. It uses crypto.getRandomValues, your browser's secure random generator, with unbiased sampling, so every line in the list has the same chance of being picked."
  - q: "What happens if a name appears twice?"
    a: "Each line counts as a separate entry, so a name listed twice has twice the chance of winning. You can use this for weighted entries, for example listing someone three times if they earned three entries."
  - q: "Are blank lines counted?"
    a: "No. Blank lines are ignored, so you can paste a list from a spreadsheet or chat without tidying it first."
  - q: "How do I draw several winners without anyone winning twice?"
    a: "Set How many to pick to the number of winners you need, or turn on Remove winners from the list and draw one prize at a time. Each winner is removed from the list before the next draw."
  - q: "Can I use it for a giveaway on social media?"
    a: "Yes. Paste the usernames of everyone who entered, one per line, and press Pick. Sharing or recording your screen during the draw helps show it was fair."
  - q: "Is my list stored or sent anywhere?"
    a: "No. The list is processed in your browser only and is never uploaded or saved."
---

## How to pick a random name

1. Type or paste names into **List (one name per line)**. Blank lines are skipped automatically.
2. Set **How many to pick**: the number of winners for this draw.
3. Check **Remove winners from the list** if you plan several draws and no one should win twice.
4. Press **Pick** and announce the result.

## How the draw works

Every non-blank line is one ticket in the hat. The picker uses crypto.getRandomValues, your browser's secure random number generator, with rejection sampling to avoid bias, so every ticket has an equal chance.

Duplicate names are **not** merged. That makes weighted draws easy:

| List | Chance when picking 1 |
| --- | --- |
| Alex, Ben, Chloe, Dan | 1/4 each |
| Alex, Alex, Ben, Chloe | Alex 2/4, Ben 1/4, Chloe 1/4 |

If you want everyone to have equal odds, make sure each person appears only once.

## Popular uses

- **Classroom**: call on a student, choose who presents first.
- **Giveaways and contests**: pick winners from comments, entries or attendees.
- **Team tasks**: who takes meeting notes, who runs the standup this week.
- **Everyday decisions**: who buys the coffee, who picks the restaurant.

## Tips for a transparent draw

- Share the full list before the draw so everyone can check they are on it.
- Record or share your screen while pressing **Pick**.
- For several prizes, draw from the smallest prize to the biggest and keep **Remove winners from the list** on.

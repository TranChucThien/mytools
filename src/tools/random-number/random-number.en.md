---
faq:
  - q: Are the numbers truly random?
    a: The tool uses crypto.getRandomValues, the cryptographically secure random generator built into your browser, with rejection sampling so every number in the range is equally likely.
  - q: How do I pick several numbers without repeats?
    a: Set how many numbers you need and keep "No duplicates" checked. For example, to pick 6 lottery numbers from 1 to 49, enter Min 1, Max 49, How many 6.
  - q: Can I use this to pick a giveaway winner?
    a: Yes. Number your entrants (say 1 to 250) and generate as many unique winners as you need. Recording your screen while drawing keeps things transparent.
  - q: What's the largest range supported?
    a: You can use very large positive or negative whole numbers (up to about 9 quadrillion) and generate up to 1,000 numbers at once.
  - q: Are my results stored anywhere?
    a: No. Everything runs in your browser and nothing is sent to a server.
---

## How to generate random numbers

1. Enter **Min** and **Max** – the range you want, both ends included.
2. Enter **How many** numbers you need (1 to 1,000).
3. Keep **No duplicates** checked if each number may appear only once.
4. Press **Generate**. Press it again as often as you like for a fresh draw.

## Popular uses

- **Giveaways and raffles** on social media, streams and office events.
- **Picking a student** or a speaker at random by number.
- **Lottery number picks** for 6/49-style games.
- **Splitting teams** or setting a random running order.
- **Games** – replace a die (1 to 6) or a coin flip (1 to 2).

## Why this generator is fair

Many sites use `Math.random()`, which isn't designed for fairness. This tool uses your browser's secure random number generator and removes "modulo bias", so no number is favored over another.

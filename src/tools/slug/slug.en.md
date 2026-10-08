---
faq:
  - q: "What is a URL slug?"
    a: "A slug is the readable last part of a URL that identifies a page. In example.com/blog/how-to-bake-bread, the slug is how-to-bake-bread. A good slug is short, lowercase and describes the page."
  - q: "Should I use hyphens or underscores in URLs?"
    a: "Use hyphens. Google recommends hyphens to separate words in URLs because they are treated as word separators. Use underscores only if your platform requires them."
  - q: "What happens to accents and special characters?"
    a: "Accents are removed, so \"café crème\" becomes \"cafe-creme\", and the Vietnamese letter đ becomes d. Any character that is not a letter or digit becomes the separator, repeated separators are collapsed into one, and separators at the start or end are trimmed."
  - q: "How long should a slug be?"
    a: "There is no hard limit, but shorter is better. Three to six words that include your main keyword is usually enough. Short slugs are easier to read, share and remember."
  - q: "Should I remove stop words like \"a\", \"the\" and \"of\"?"
    a: "Often yes, as long as the slug still makes sense. how-to-bake-bread reads fine without extra words, but do not remove words that change the meaning."
  - q: "Is it safe to change the slug of a published page?"
    a: "Changing a slug changes the URL, so old links may break with a 404 error. If you must change it, set up a 301 redirect from the old URL to the new one."
---

## How to generate a slug

1. Paste your post title, product name or category into the input box.
2. Choose a **Separator**: `-` (recommended) or `_`.
3. The slug appears instantly. Copy it into the URL or permalink field of your website.

## How the conversion works

Take the title "10 Tips for Better Sleep (2nd Edition)!":

1. Convert to lowercase: "10 tips for better sleep (2nd edition)!"
2. Remove accents, if any.
3. Replace spaces and punctuation with the separator, collapse repeats and trim the ends.

Result: `10-tips-for-better-sleep-2nd-edition`

| Title | Slug |
| --- | --- |
| What Is SEO? A Beginner's Guide | what-is-seo-a-beginner-s-guide |
| Crème Brûlée Recipe | creme-brulee-recipe |
| Hướng dẫn nấu phở bò Hà Nội! | huong-dan-nau-pho-bo-ha-noi |

Note that the apostrophe in "Beginner's" becomes a separator, so you may want to tidy that slug by hand to `seo-beginners-guide`.

## Why hyphens are the standard

Search engines read a hyphen as a space between words, so `better-sleep` is understood as "better" and "sleep". Google's own URL guidelines recommend hyphens over underscores. Hyphenated URLs are also easier for people to read when they appear in search results, emails or chats.

## Tips for SEO-friendly slugs

- **Keep it short and include the main keyword**: `better-sleep-tips` beats a full sentence.
- **Drop filler words** such as "a", "the", "and", "of" when the slug still reads clearly.
- **Leave out dates and years** if you plan to update the page over time.
- **Set it once and keep it**: changing slugs later means setting up redirects.

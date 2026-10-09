---
faq:
  - q: "Are my images uploaded to a server?"
    a: "No. Images are compressed right in your browser with the Canvas API and never leave your device, so it is safe to use with personal photos and documents."
  - q: "What Quality setting should I use?"
    a: "For photos, a quality of 70 to 85 is usually a good balance between file size and sharpness, and the difference is hard to see. The default is 80. If the file is still too large, lower the Quality or set a Max width (px)."
  - q: "Why is my PNG not getting smaller?"
    a: "PNG is lossless, so the Quality slider has no effect on it. For photos, PNG files are usually much larger than JPEG or WebP. Use PNG for screenshots, logos and images that need a transparent background."
  - q: "What happens to transparent areas when I save as JPEG?"
    a: "JPEG does not support transparency, so transparent areas are filled with white. Choose WebP or PNG if you need to keep the transparent background."
  - q: "Can I compress HEIC photos from an iPhone?"
    a: "Not yet. The tool accepts JPG, PNG and WebP. Export or share the photo as JPG on your phone first, then choose it here."
  - q: "Does the compressed image keep GPS location data?"
    a: "No. The output does not include EXIF metadata such as GPS location, capture time or camera model, which helps protect your privacy when you share photos."
---

## How to compress images online

1. Click **Choose images** and select one or more JPG, PNG or WebP files.
2. Move the **Quality** slider (10 to 100, default 80). Lower values give smaller files but less detail.
3. To shrink the dimensions, enter a **Max width (px)**, for example 1600. The aspect ratio is kept and smaller images are never upscaled.
4. Pick a **Format**: **JPEG**, **WebP** or **PNG**.
5. Check the original size, new size and percent saved for each image, then click **Download**.

## Which format should you choose?

| Format | Best for | Notes |
| --- | --- | --- |
| JPEG | Photos for chat, email and online forms | Accepted everywhere, transparency is filled with white |
| WebP | Website images, smallest files | Usually smaller than JPEG at similar quality, keeps transparency |
| PNG | Screenshots, logos, images with text | Lossless, ignores the Quality slider, large for photos |

## When to compress and resize images

- **Upload limits:** many forms and websites reject images above a certain file size. Lower the **Quality** or set a **Max width (px)** until the file fits.
- **Faster web pages:** lighter images load faster, especially on phones. A width of 1200 to 1920 px is enough for most layouts.
- **Sending via chat or email:** smaller files send faster, stay under attachment limits and save storage for the recipient.

## Private by design

Everything runs in your browser with the Canvas API, and your images are never uploaded. The output also drops EXIF metadata, including GPS location, so you do not accidentally share where a photo was taken.

> Note: HEIC photos from iPhones are not supported yet. Convert them to JPG on your phone before compressing.

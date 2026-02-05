# Bluethroat Labs Content Manager Guide

Welcome to the Bluethroat Labs Content Management System (CMS). This guide is designed for content creators (admins) to help them use Sanity Studio efficiently.

## 1. Accessing the Studio

Your Studio is available at: [bluethroat-labs.vercel.app/studio](https://bluethroat-labs.vercel.app/studio)

Log in with your authorized provider (GitHub/Google/Email).

## 2. Content Types

### Blogs (Reveries)
- **Title**: The main title of the blog post.
- **Slug**: Click "Generate" to create a URL-friendly name based on the title.
- **Banner Image**: High-quality header image. Use "Hotspot" to ensure the main focus is always visible.
- **Category**: Select the relevant category (TEE Security, General, etc.).
- **Published At**: Set the date for the post.
- **Content**: The most powerful part of the editor (see "Portable Text" below).

### Documentation (Docs)
- **Title**: Document title.
- **Slug**: URL path (e.g., `platforms/nitro`).
- **Hero Image**: Optional wide banner image for the doc top.
- **Content**: Rich text area for the main document body.
- **Keywords**: Tags used for SEO and searchability.

---

## 3. Working with the Content Editor (Portable Text)

Our editor is "block-based," meaning every paragraph, heading, or image is a "block."

### Text Styles
Use the dropdown in the editor to select:
- **H1, H2, H3**: For structured headings.
- **Quote**: For important callouts or testimonials.
- **Lists**: Use the bullet or numbered list icons in the toolbar.

### Specialized Blocks
Click the **(+)** icon or type `/` to add:
- **Image**: Add images with specific Alt text (for accessibility) and Captions.
- **Code Block**: For technical documentation.
    - Select the language (e.g., TypeScript, Rust).
    - Add a **Filename** (e.g., `main.rs`) to show it above the code.
- **Divider**: Adds a clean horizontal line to separate sections.

### Inline Styles
Highlight text to apply:
- **Bold/Italic**
- **Code**: For inline `inline code` snippets.
- **Links**: Link internally or externally.

---

## 4. Best Practices

1.  **Drafts vs. Published**: Changes are automatically saved as "Drafts." Click the **green Publish button** to make your changes visible on the live site.
2.  **Images**: Always provide "Alt Text" for accessibility.
3.  **Filenames**: When adding code blocks, always include the filename if applicable; it helps developers follow along.
4.  **Dividers**: Use them liberally to break up long documents into readable chunks.

---

## 5. Support

If you encounter issues with the Studio, contact the engineering team or refer to the [Sanity Documentation](https://www.sanity.io/docs).

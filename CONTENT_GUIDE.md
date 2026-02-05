# Bluethroat Labs: Sanity Content Manager Guide

This guide empowers you to manage the website's content with **maximum flexibility**. Our system uses a "Block-Based" approach, meaning you can compose complex pages like LEGO sets.

---

## 1. Accessing the Studio

- **URL**: [bluethroat-labs.vercel.app/studio](https://bluethroat-labs.vercel.app/studio)
- **Login**: Use your authorized GitHub, Google, or Email account.

---

## 2. Managing the Docs Sidebar (Hierarchy)

The left sidebar on the `/docs` pages is controlled by the **Documentation Navigation** tool.

1.  **Open "Documentation Navigation"**: This is a singleton (only one exists).
2.  **Add Items**: Each item represents a link in the sidebar.
    - **Display Title**: What the user sees.
    - **Linked Document**: The actual "Doc" you want to open.
3.  **Nesting (List them accordingly)**: 
    - You can add **Sub Items** within any navigation item.
    - This allows for deep hierarchies (e.g., *TEE Handbook -> Hardware Security -> Nitro*).

---

## 3. Creating Content with "Maximum Flexibility"

When editing **Blogs (Reveries)** or **Docs**, use the **Content** field to its full potential.

### Adaptive Table of Contents (TOC)
The right-hand "Contents" sidebar on Docs pages is **automatic**. 
- Any text set to **H1, H2, or H3** inside your content field will instantly appear in the TOC.
- This allows users to jump to specific sections without you needing to build the menu manually.

### Advanced Blocks
Click the **(+)** button or type `/` to insert special blocks:
- **Code Blocks**: Essential for technical docs. 
    - **Tip**: Always add a **Filename** (e.g., `main.ts`). It renders a professional "terminal" tab above your code.
- **Dividers**: Use these to separate major sections visually.
- **Images**: Add images with specific **Alt Text** (crucial for SEO) and **Captions**. Reach for "Hotspot" to ensure the image crops correctly on mobile.

### Linking Blogs to Docs
In the **Doc** editor, use the **Highlighted Blogs** field. 
- You can reference existing Reveries. 
- These will appear at the bottom of your Doc as stylish "Featured" cards, connecting your technical documentation to your stories and updates.

---

## 4. Workflow & Best Practices

1.  **Slugs**: Always click "Generate" on the Slug field. Without a slug, a document doesn't have a URL.
2.  **Drafts vs. Live**: Your changes save automatically as you type (Orange bar). They only go **Live** (Green bar) when you click **Publish**.
3.  **Filenames**: When adding code, always specify the file name if it’s a specific script. It adds immense value to the reader.
4.  **TOC Clarity**: Use H2 for main sections and H3 for sub-sections. The TOC will indent them automatically for a clean look.

---

## 5. Support

For technical issues or feature requests regarding the CMS, please coordinate with the engineering team.

# Maintaining the Bluethroat Labs website

This guide covers local development and the content workflow for publishing a
series in both the **Reveries** catalog and the **Writeups** bookshelf.

## Local setup

### Prerequisites

- Node.js 20.9 or newer
- Yarn Classic (the repository uses a Yarn v1 lockfile)
- Access to the Bluethroat Labs Sanity project

### Install and run

1. Clone the repository and enter its directory.
2. Create a local environment file:

   ```sh
   cp .env.example .env.local
   ```

3. Add the Sanity project values to `.env.local`:

   ```dotenv
   NEXT_PUBLIC_SANITY_PROJECT_ID=<project-id>
   NEXT_PUBLIC_SANITY_DATASET=<dataset-name>
   ```

   `SANITY_API_TOKEN` and `DRAFT_ROUTE_SECRET` are only needed when testing the
   protected draft-preview route. Obtain these values from a project
   administrator; do not commit `.env.local` or share its secrets.

4. Install the locked dependencies and start the development server:

   ```sh
   yarn
   yarn dev
   ```

5. Open the site at [http://localhost:3000](http://localhost:3000) and Sanity
   Studio at [http://localhost:3000/studio](http://localhost:3000/studio).

If Studio cannot connect from localhost, add `http://localhost:3000` to the
Sanity project's **API > CORS Origins** and allow credentials.

Before opening a pull request, run:

```sh
yarn lint
yarn build
```

The production build reads published content from the configured Sanity dataset,
so it needs valid Sanity environment variables and network access.

## How Reveries and the bookshelf relate

The two views are backed by separate Sanity document types. They are not
automatically synchronized.

| Website view                                  | Sanity document                | Ordering                                                          |
| --------------------------------------------- | ------------------------------ | ----------------------------------------------------------------- |
| `/reveries` and the homepage Reveries section | `Blog`                         | `Published at`, newest first; the homepage shows the latest three |
| Homepage **Our Work > Writeups** shelf        | `Writeup Series` and `Writeup` | Both lists use their manual order in Studio                       |

A published Blog creates the article and its Reveries card. A published Writeup
creates the corresponding book on the shelf. When an article should appear in
both places, maintain both documents as a pair.

### How the shelf handles series

- With more than one published Writeup Series, the dialog first shows all series
  as books. Opening a series shows its Writeups, and the back button returns to
  the series shelf.
- With exactly one published Writeup Series, the dialog opens that series'
  Writeups directly.
- Each series book displays the number of published Writeups assigned to it.
- Series use the manual order under **Writeup Series**. Writeups use the manual
  order under **Writeups** and retain that relative order inside their series.
- Desktop displays up to six series or Writeups per shelf page. The previous and
  next shelf controls reveal additional items. Mobile uses a single-book
  carousel.
- A published series with no published Writeups is still shown with a count of
  zero. A Writeup with no series is not shown on any series shelf.

## Add a new series of writeups

Use the embedded Studio at `/studio` and complete these steps.

### 1. Create the Writeup Series

Under **Writeup Series**, create a document with:

- **Title**: the shared series name.
- **Logo**: an optional square icon used for the series record.
- **Cover Image**: required; use a portrait image close to the rendered book
  ratio of 367:444 to minimize cropping.
- **Description**: an optional Markdown description.

Publish the document, then return to the **Writeup Series** list and drag it to
the desired position. Every published series is available from the chooser, so
it does not need to be moved to the first position to become visible.

### 2. Create each Reverie article

Under **Blog**, create one document for each part of the series:

- Set **Title** and generate the **Slug**.
- Optionally set **Catalog Title** when the `/reveries` card needs a shorter
  title than the article page.
- Set **Series Label** consistently, for example `Part 1 of the dstack series`.
- Add the banner/cover images, author, publication date, content, and SEO
  fields.
- Add the **Vulnerability Writeup** category when the article should be included
  in the shelf's **View All Writeups** link. That link opens the Reveries
  catalog with this category filter applied.
- Publish the Blog and confirm that `/reveries/<slug>` opens successfully.

Choose the final slug before creating its Writeup counterpart. Changing the slug
later also requires updating the Writeup URL.

### 3. Create the matching shelf entry

Under **Writeups**, create one document for every Blog that belongs on the
shelf:

- **Title**: normally the same as the Blog title.
- **Logo**: optional; a square image works best on the book spine.
- **Cover Image**: required; use a portrait image close to the rendered book
  ratio of `367:444` to minimize cropping.
- **Description**: the short Markdown summary shown on the opened book.
- **Series**: select the Writeup Series created above. This is required for the
  item to be included in that series even though the schema currently labels the
  field optional.
- **Link to Full Writeup**: use the Blog's internal path exactly, for example
  `/reveries/my-article-slug`.

Publish the Writeup, then arrange the Writeups list in the desired shelf order
by dragging its items in Studio.

## Keeping Reveries and Writeups in sync

For every article that should be represented in both views, keep this mapping
consistent:

| Blog field                     | Matching Writeup field or action                                             |
| ------------------------------ | ---------------------------------------------------------------------------- |
| `Title`                        | Use the same `Title` unless the shelf intentionally uses shorter copy        |
| `Slug`                         | Set `Link to Full Writeup` to `/reveries/<slug>`                             |
| `Series Label`                 | Use wording consistent with the selected Writeup Series and part number      |
| `Cover Image` / `Banner Image` | Use matching branding; separate landscape and portrait assets are acceptable |
| Published state                | Publish both documents; a draft in one collection does not hide the other    |

Use this release checklist whenever adding, renaming, moving, or removing a
series entry:

1. Confirm the Blog is published and its `/reveries/<slug>` URL works.
2. Confirm there is exactly one matching published Writeup.
3. Confirm the Writeup URL matches the Blog slug, including the leading `/`.
4. Confirm the Writeup points to the intended Writeup Series.
5. Confirm the Blog has the **Vulnerability Writeup** category if it should
   appear behind the shelf's **View All Writeups** link.
6. Confirm the series' manual rank gives it the desired position in the series
   chooser.
7. Confirm the Blog's `Published at` value gives it the desired Reveries order.
8. Confirm the Writeup's manual rank gives it the desired order within its
   series.
9. Compare the count shown on the series book with the number of published
   Writeups expected in that series.
10. Check `/reveries`, the homepage Reveries preview when relevant, and the
    homepage **Our Work > Writeups** dialog on both desktop and mobile.

When changing a slug, update the matching Writeup URL in the same release. When
unpublishing or deleting an article, also unpublish or delete its Writeup entry
so the shelf cannot retain a stale or broken link.

The code paths that define this behavior are:

- `src/lib/sanity/reveries.ts` for Reveries queries and ordering.
- `src/lib/sanity/writeups.tsx` for Writeup and Writeup Series queries.
- `src/components/ui/bookshelf.tsx` for the series chooser, pagination, series
  filtering, and shelf UI.
- `src/lib/sanity/schemas/` for the Studio fields described above.

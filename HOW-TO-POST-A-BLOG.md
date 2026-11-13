# How to post a blog on the OIT website

Blog posts are simple pages inside the `blog/` folder. Nothing else needs to be installed.
The blog works exactly as before. Pick whichever method you prefer.

## Method 1: the helper script (quickest)

1. Write your article in a plain text file, for example `my-article.txt`:
   - leave a blank line between paragraphs
   - start a line with `## ` to make a heading
   - start lines with `- ` to make a bullet list
2. Open a terminal in the website folder and run:

       python tools/new_blog_post.py --title "Your post title" --description "One or two sentences for Google" --body my-article.txt

   (On Windows, use `py` instead of `python` if `python` is not found.)
3. The script will:
   - create `blog/your-post-title.html`
   - add the post to the top of `blog/index.html`
   - add the post to `sitemap.xml`
4. Open `blog/your-post-title.html` in your browser to check it, then upload or commit the changed files.

## Method 2: by hand

1. Copy `blog/_post-template.html` and rename the copy, for example `blog/my-new-post.html`.
2. Open it in a text editor and replace the capital placeholders:
   `__TITLE__`, `__DESCRIPTION__`, `__SLUG__` (the file name without `.html`),
   `__DATE_ISO__` (like 2026-11-12), `__DATE_HUMAN__` (like November 2026) and `__BODY__` (your article as HTML paragraphs).
3. In `blog/index.html`, copy one `<div class="cta">...</div>` block to the top of the list and change the link, title and description.
4. In `sitemap.xml`, copy one `<url>...</url>` block for the new page and change the address and date.

## Tips

- Keep titles under about 60 characters and descriptions under about 155.
- Use one clear topic per post, and link to a course page where it fits, for example
  `../courses/data-analysis.html`.
- Do not say or imply guaranteed jobs or guaranteed certificate recognition.

#!/usr/bin/env python3
"""Create a new blog post for the OIT website.

What it does
  1. Builds blog/<slug>.html from blog/_post-template.html
  2. Adds the post to the top of blog/index.html
  3. Adds the post to sitemap.xml

Write your article in a plain text file:
  - Separate paragraphs with a blank line
  - Start a line with "## " for a heading
  - Start lines with "- " for a bullet list

Run (from the website folder):
  python tools/new_blog_post.py --title "Your title" --description "One or two sentences" --body my-article.txt
(Use "py" instead of "python" on Windows if "python" is not found.)
Standard library only: nothing to install.
"""
import argparse, datetime, html, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = 'https://othelloinstituteoftechnology.com'


def slugify(text):
    s = re.sub(r'[^a-z0-9]+', '-', text.lower()).strip('-')
    return s[:70].strip('-') or 'post'


def body_to_html(text):
    out, bullets = [], []
    def flush():
        if bullets:
            out.append('<ul>' + ''.join('<li>%s</li>' % html.escape(b) for b in bullets) + '</ul>')
            bullets.clear()
    for block in re.split(r'\n\s*\n', text.strip()):
        lines = [l.rstrip() for l in block.strip().splitlines() if l.strip()]
        if not lines:
            continue
        if all(l.startswith('- ') for l in lines):
            bullets.extend(l[2:].strip() for l in lines)
            flush()
        elif lines[0].startswith('## '):
            flush()
            out.append('<h2>%s</h2>' % html.escape(lines[0][3:].strip()))
            rest = ' '.join(lines[1:]).strip()
            if rest:
                out.append('<p>%s</p>' % html.escape(rest))
        else:
            flush()
            out.append('<p>%s</p>' % html.escape(' '.join(lines)))
    flush()
    return '\n'.join(out)


def main():
    ap = argparse.ArgumentParser(description='Create a new OIT blog post')
    ap.add_argument('--title')
    ap.add_argument('--description')
    ap.add_argument('--body', help='path to a plain text file with the article')
    ap.add_argument('--slug', help='optional URL name, e.g. my-first-post')
    a = ap.parse_args()

    title = a.title or input('Post title: ').strip()
    desc = a.description or input('Short description (1-2 sentences, used on Google): ').strip()
    body_path = a.body or input('Path to the text file with your article: ').strip().strip('"')
    if not (title and desc and os.path.isfile(body_path)):
        sys.exit('Title, description and an existing article file are all required.')
    slug = a.slug or slugify(title)
    target = os.path.join(ROOT, 'blog', slug + '.html')
    if os.path.exists(target):
        sys.exit('blog/%s.html already exists. Pick another --slug.' % slug)

    today = datetime.date.today()
    tpl = open(os.path.join(ROOT, 'blog', '_post-template.html'), encoding='utf-8').read()
    body = body_to_html(open(body_path, encoding='utf-8').read())
    esc = lambda s: html.escape(s, quote=True)
    json_safe = lambda s: s.replace('\\', '\\\\').replace('"', '\\"')
    page = (tpl.replace('__SLUG__', slug)
               .replace('__DATE_ISO__', today.isoformat())
               .replace('__DATE_HUMAN__', today.strftime('%B %Y'))
               .replace('__BODY__', body))
    # title/description appear in HTML attributes, text and JSON-LD
    page = re.sub(r'("headline":")__TITLE__', lambda m: m.group(1) + json_safe(title), page)
    page = re.sub(r'("description":")__DESCRIPTION__', lambda m: m.group(1) + json_safe(desc), page)
    page = page.replace('__TITLE__', esc(title)).replace('__DESCRIPTION__', esc(desc))
    open(target, 'w', encoding='utf-8').write(page)

    # blog index: newest first
    idx_path = os.path.join(ROOT, 'blog', 'index.html')
    idx = open(idx_path, encoding='utf-8').read()
    card = '<div class="cta"><a href="%s.html"><strong>%s</strong></a><br><span class="meta">%s</span></div>\n' % (slug, esc(title), esc(desc))
    marker = '<div class="cta">'
    if marker not in idx:
        sys.exit('Could not find the post list in blog/index.html')
    idx = idx.replace(marker, card + marker, 1)
    open(idx_path, 'w', encoding='utf-8').write(idx)

    # sitemap
    sm_path = os.path.join(ROOT, 'sitemap.xml')
    sm = open(sm_path, encoding='utf-8').read()
    entry = ('  <url>\n    <loc>%s/blog/%s.html</loc>\n    <lastmod>%s</lastmod>\n    <priority>0.8</priority>\n  </url>\n'
             % (SITE, slug, today.isoformat()))
    sm = sm.replace('</urlset>', entry + '</urlset>')
    open(sm_path, 'w', encoding='utf-8').write(sm)

    print('Created blog/%s.html, updated blog/index.html and sitemap.xml' % slug)
    print('Next: open blog/%s.html in your browser to check it, then upload/commit the changed files.' % slug)


if __name__ == '__main__':
    main()

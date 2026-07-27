// Post-build step: generate a static HTML file per article with correct
// social-preview meta tags (title, description, Open Graph, Twitter Card).
//
// Why: the site is a Vue SPA, so link-preview crawlers (iMessage, Slack,
// Twitter, LinkedIn, Facebook) — which don't run JS — only ever saw the
// generic tags in the base index.html. This bakes per-article tags into
// static HTML that crawlers read, while real users still boot the full SPA
// (the app <script> is preserved untouched).

import { createJiti } from 'jiti'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const distDir = resolve(root, 'dist')

const SITE_URL = 'https://mojmali.com'

// Import the TypeScript source of truth directly.
const jiti = createJiti(import.meta.url)
const { articles } = await jiti.import(resolve(root, 'src/data/articles.ts'))

const template = readFileSync(resolve(distDir, 'index.html'), 'utf8')

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function buildHead(article) {
  const url = `${SITE_URL}/article/${article.slug}`
  const title = `${article.title} — Keivan Mojmali`
  const description = article.subtitle
  const image = article.image ? `${SITE_URL}${article.image}` : ''

  const tags = [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}">`,
    `<meta property="og:title" content="${escapeHtml(article.title)}">`,
    `<meta property="og:description" content="${escapeHtml(description)}">`,
    `<meta property="og:type" content="article">`,
    `<meta property="og:url" content="${escapeHtml(url)}">`,
    image && `<meta property="og:image" content="${escapeHtml(image)}">`,
    `<meta name="twitter:card" content="${image ? 'summary_large_image' : 'summary'}">`,
    `<meta name="twitter:title" content="${escapeHtml(article.title)}">`,
    `<meta name="twitter:description" content="${escapeHtml(description)}">`,
    image && `<meta name="twitter:image" content="${escapeHtml(image)}">`,
  ].filter(Boolean)

  return tags
}

// Replace the base template's head tags with article-specific ones.
function render(article) {
  let html = template

  // Swap <title>.
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(`${article.title} — Keivan Mojmali`)}</title>`)

  // Remove the base social/description tags we're overriding, then inject ours.
  html = html
    .replace(/\s*<meta name="description"[^>]*>/g, '')
    .replace(/\s*<meta property="og:title"[^>]*>/g, '')
    .replace(/\s*<meta property="og:description"[^>]*>/g, '')
    .replace(/\s*<meta property="og:type"[^>]*>/g, '')
    .replace(/\s*<meta property="og:url"[^>]*>/g, '')

  const injected = buildHead(article)
    .filter((t) => !t.startsWith('<title>')) // title already handled above
    .map((t) => `    ${t}`)
    .join('\n')

  html = html.replace('</title>', `</title>\n${injected}`)

  return html
}

const outDir = resolve(distDir, 'article')
mkdirSync(outDir, { recursive: true })

for (const article of articles) {
  const html = render(article)
  const outPath = resolve(outDir, `${article.slug}.html`)
  writeFileSync(outPath, html, 'utf8')
  console.log(`prerendered meta → dist/article/${article.slug}.html`)
}

console.log(`\n✓ prerendered ${articles.length} article preview page(s)`)

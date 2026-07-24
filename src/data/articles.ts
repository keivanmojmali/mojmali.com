export interface Article {
  slug: string
  title: string
  subtitle: string
  image: string
  contentPath: string
  date: string
  category: string
}

export const articles: Article[] = [
  {
    slug: 'naturally-occurring-abstract-art-nyc',
    title: 'Naturally Occurring Abstract Art of New York City',
    subtitle: 'The abstract language of New York’s subway panels',
    image: '/abstract-patch.png',
    contentPath: '/content/naturally-occurring-abstract-art-nyc.md',
    date: '2026-07-24',
    category: 'Writing'
  },
  {
    slug: 'zenview-chrome-extension',
    title: 'ZenView Chrome Extension',
    subtitle: 'Fullscreen YouTube videos inside of a tab',
    image: '/zenview-patch.png',
    contentPath: '/content/zenview-chrome-extension.md',
    date: '2024-12-17',
    category: 'Projects'
  },
  {
    slug: 'blockslides-toolkit',
    title: 'Blockslides: WYSIWYG slide deck editor toolkit',
    subtitle: 'Slide editor built on ProseMirror',
    image: '/bs-patch.png',
    contentPath: '/content/blockslides-toolkit.md',
    date: '2024-05-22',
    category: 'Projects'
  }
]

// Get unique categories from articles
export const categories = [...new Set(articles.map(a => a.category))]


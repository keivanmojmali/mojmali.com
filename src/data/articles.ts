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
    slug: 'zenview-chrome-extension',
    title: 'ZenView Chrome Extension',
    subtitle: 'Fullscreen YouTube videos inside of a tab',
    image: '/zenview-patch.png',
    contentPath: '/content/zenview-chrome-extension.md',
    date: '2024-12-17',
    category: 'Projects'
  }
]

// Get unique categories from articles
export const categories = [...new Set(articles.map(a => a.category))]


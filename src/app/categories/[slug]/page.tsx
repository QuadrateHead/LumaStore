import CategoryPage from '../../category/page'

export function generateStaticParams() {
  return [
    { slug: 'audio' },
    { slug: 'keyboards' },
    { slug: 'smart-watches' },
    { slug: 'desk-setup' },
    { slug: 'bags' },
    { slug: 'phone-accessories' },
  ]
}

export default function CategorySlugPage() {
  return <CategoryPage />
}

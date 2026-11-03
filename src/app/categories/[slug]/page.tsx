import CategoryPage from '../../category/page'

export function generateStaticParams() {
  return [{ slug: 'audio' }, { slug: 'desk-setup' }]
}

export default function CategorySlugPage() {
  return <CategoryPage />
}

import ProductPage from '../../product/page'

export function generateStaticParams() {
  return [{ slug: 'wireless-headphones' }]
}

export default function ProductSlugPage() {
  return <ProductPage />
}

import ProductFormPage from '../../new/page'

export function generateStaticParams() {
  return [{ id: 'xm5' }, { id: 'k2' }, { id: 'mx3s' }]
}

export default function EditProductPage() {
  return <ProductFormPage />
}

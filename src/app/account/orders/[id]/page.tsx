import OrderDetailsClient from './OrderDetailsClient'

export function generateStaticParams() {
  return [{ id: 'LUMA-10482' }]
}

export default function OrderDetailsPage() {
  return <OrderDetailsClient />
}

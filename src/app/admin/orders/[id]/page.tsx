import AdminManagementView from '@/components/AdminManagementView'

export function generateStaticParams() {
  return [{ id: 'LUMA-10482' }]
}

export default function AdminOrderPage() {
  return <AdminManagementView />
}

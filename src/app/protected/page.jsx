import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== 'admin') {
    return <p className="text-red-600 p-8">Admins only</p>
  }

  return <p className="p-8">This is an admin-only section.</p>
}

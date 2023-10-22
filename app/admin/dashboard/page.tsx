import { getCurrentUser } from '@/lib/operations'
import { redirect } from 'next/navigation'
import { FunctionComponent } from 'react'

interface DashboardPageProps {}

const DashboardPage: FunctionComponent<DashboardPageProps> = async () => {
  const currentUser = await getCurrentUser()
  if (currentUser) return redirect('/admin/dashboard/tour')
  else {
    return redirect('/admin/login')
  }
}

export default DashboardPage

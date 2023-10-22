import Navbar from '@/layout/dashboard/navbar'
import SidebarNav from '@/layout/dashboard/sidebar-nav'
import SubSidebarNav from '@/layout/dashboard/sub-sidebar-nav'
import { getTourTypes } from '@/lib/operations'
import ClientProvider from '@/provider/client-provider'
import { FunctionComponent, ReactNode } from 'react'
import { Cairo } from 'next/font/google'
import { cn } from '@/lib/utils'
import { Metadata } from 'next'
import { ThemeProvider } from '@/provider/theme-provider'
interface DashboardLayoutProps {
  children: ReactNode
}
const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  display: 'swap',
  preload: true,
  style: 'normal',
  weight: ['1000', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'Mundo Tours | Dashboard',
}

const DashboardLayout: FunctionComponent<DashboardLayoutProps> = async ({ children }) => {
  const response = await getTourTypes()

  return (
    <div id="__next" className={cn(cairo.className)}>
      <div className="min-h-full flex flex-col">
        <div>
          <div
            style={{
              height: 'calc((100vh - 0px) - 0px)',
              maxHeight: 'calc((100vh - 0px) - 0px)',
            }}
          >
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
              <ClientProvider types={response.results || []}>
                <SidebarNav />
                <SubSidebarNav />
                <main className="flex flex-col flex-1 w-full overflow-x-hidden bg-scale-200">
                  <Navbar />
                  {children}
                </main>
              </ClientProvider>
            </ThemeProvider>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout

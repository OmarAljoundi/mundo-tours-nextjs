import BreadCrumb from '@/components/TourListing/bread-crumb'
import Tabs from '@/components/TourListing/tabs'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <div className="container">
        <BreadCrumb />
        <Tabs />
        {children}
      </div>
    </section>
  )
}

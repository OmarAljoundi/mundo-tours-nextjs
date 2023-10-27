export const revalidate = 0
import BreadCrumb from '@/components/TourListing/bread-crumb'
import Filter from '@/components/shared/filter'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <div className="container">
        <BreadCrumb />
        <Filter onChange={true} enableTabs={true} />
        <div className="mt-4 mb-16">{children}</div>
      </div>
    </section>
  )
}

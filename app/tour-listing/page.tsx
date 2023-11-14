import Tours from '@/components/TourListing/tours'
import Filter from '@/components/shared/filter'
import { getContentData, getTours } from '@/lib/operations'

export async function generateMetadata() {
  const data = await getContentData()
  return {
    title: data?.best_tours?.seo?.title,
    description: data?.best_tours?.seo?.description,
    keywords: data?.best_tours?.seo?.tags || '',
  }
}
const Destination = async () => {
  const tours = (await getTours())?.filter((x) => x.is_active)
  return (
    <>
      <Filter onChange={true} enableTabs={true} />
      <div className="mt-4 mb-16">
        <Tours tours={tours ?? []} />
      </div>
    </>
  )
}

export default Destination

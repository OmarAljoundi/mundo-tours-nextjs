import Tours from '@/components/TourListing/tours'
import Filter from '@/components/shared/filter'
import { getContentDataAction } from '@/lib/server-actions'

export async function generateMetadata() {
  const data = await getContentDataAction()
  return {
    title: data?.best_tours?.seo?.title,
    description: data?.best_tours?.seo?.description,
    keywords: data?.best_tours?.seo?.tags || '',
  }
}
const Destination = async () => {
  return (
    <div>
      <Filter onChange={true} enableTabs={true} />
      <Tours />
    </div>
  )
}

export default Destination

import Tours from '@/components/TourListing/tours'
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
  const tours = await getTours()
  return <Tours tours={tours ?? []} />
}

export default Destination

import Tours from '@/components/TourListing/tours'
import Filter from '@/components/shared/filter'
import { REVALIDATE_TOUR_LIST } from '@/lib/keys'
import { getContentData, getTours } from '@/lib/operations'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'

export async function generateMetadata() {
  const data = await getContentData()
  return {
    title: data?.best_tours?.seo?.title,
    description: data?.best_tours?.seo?.description,
    keywords: data?.best_tours?.seo?.tags || '',
  }
}
const Destination = async () => {
  const query = new QueryClient()
  await query.prefetchQuery({
    queryKey: [REVALIDATE_TOUR_LIST],
    queryFn: getTours,
  })
  return (
    <HydrationBoundary state={dehydrate(query)}>
      <Filter onChange={true} enableTabs={true} />
      <Tours />
    </HydrationBoundary>
  )
}

export default Destination

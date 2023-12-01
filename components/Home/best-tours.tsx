import { REVALIDATE_TOUR_LIST } from '@/lib/keys'
import BestToursList from './best-tours.list'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import { getTours } from '@/lib/operations'
const BestTours = async () => {
  const query = new QueryClient()
  await query.prefetchQuery({
    queryKey: [REVALIDATE_TOUR_LIST],
    queryFn: getTours,
  })

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className="container">
        <BestToursList />
      </div>
    </HydrationBoundary>
  )
}

export default BestTours

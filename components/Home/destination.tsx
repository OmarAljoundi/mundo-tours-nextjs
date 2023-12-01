import { REVALIDATE_LOCATION_LIST } from '@/lib/keys'
import { getDestination } from '@/lib/operations'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import DestinationList from './destination-list'

const Destination = async () => {
  const query = new QueryClient()
  await query.prefetchQuery({
    queryKey: [REVALIDATE_LOCATION_LIST],
    queryFn: getDestination,
  })
  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className="container">
        <DestinationList />
      </div>
    </HydrationBoundary>
  )
}

export default Destination

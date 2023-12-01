import { REVALIDATE_TOUR_TYPE } from '@/lib/keys'
import { getTourTypes } from '@/lib/operations'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import CategoryList from './category-list'
const Category = async () => {
  const query = new QueryClient()
  await query.prefetchQuery({
    queryKey: [REVALIDATE_TOUR_TYPE],
    queryFn: getTourTypes,
  })
  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className="container">
        <CategoryList />
      </div>
    </HydrationBoundary>
  )
}

export default Category

import { FunctionComponent, ReactNode } from 'react'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import { USER_COUNTRY } from '@/lib/keys'
import { getUserCountry } from '@/lib/actions'
interface PrefetchCountryProps {
  children: ReactNode
}

const PrefetchCountry: FunctionComponent<PrefetchCountryProps> = async ({ children }) => {
  const query = new QueryClient()
  await query.prefetchQuery({
    queryKey: [USER_COUNTRY],
    queryFn: getUserCountry,
  })
  return <HydrationBoundary state={dehydrate(query)}>{children}</HydrationBoundary>
}

export default PrefetchCountry

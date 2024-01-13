'use client'
import { getDestination } from '@/lib/operations'
import { REVALIDATE_LOCATION_LIST } from '@/lib/keys'
import { useQuery } from '@tanstack/react-query'
import { Order, SearchQuery } from '@/types/search'
import { SearchData } from '@/lib/server-actions'
import { Location } from '@/types/custom'

export default function useLocations() {
  return useQuery({
    queryKey: [REVALIDATE_LOCATION_LIST],
    queryFn: async () => {
      var _SQ: SearchQuery = {
        FilterByOptions: [],
        OrderByOptions: [{ MemberName: 'created_at', SortOrder: Order.DESC }],
        PageIndex: 0,
        PageSize: 1000,
        Select: '*,location_attributes(*,location_tours(*))',
        Table: 'location',
      }

      var response = await SearchData<Location>(_SQ)
      return response
    },
  })
}

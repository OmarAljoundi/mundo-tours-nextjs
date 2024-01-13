'use client'
import { getTours } from '@/lib/operations'
import { REVALIDATE_TOUR_LIST } from '@/lib/keys'
import { useQuery } from '@tanstack/react-query'
import { SearchData } from '@/lib/server-actions'
import { SearchQuery } from '@/types/search'
import { Tour } from '@/types/custom'

export default function useTours() {
  return useQuery({
    queryKey: [REVALIDATE_TOUR_LIST],
    queryFn: async () => {
      var _SQ: SearchQuery = {
        FilterByOptions: [],
        OrderByOptions: [],
        PageIndex: 0,
        PageSize: 1000,
        Select: '*,tour_type(*)',
        Table: 'tour',
      }
      const data = await SearchData<Tour>(_SQ)
      return data?.results || []
    },
  })
}

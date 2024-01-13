'use client'
import { getTourTypes } from '@/lib/operations'
import { REVALIDATE_TOUR_TYPE } from '@/lib/keys'
import { useQuery } from '@tanstack/react-query'
import { SearchQuery } from '@/types/search'
import { SearchData } from '@/lib/server-actions'
import { TourType } from '@/types/custom'

export default function useTourTypes() {
  return useQuery({
    queryKey: [REVALIDATE_TOUR_TYPE],
    queryFn: async () => {
      var _SQ: SearchQuery = {
        FilterByOptions: [],
        OrderByOptions: [],
        PageIndex: 0,
        PageSize: 100,
        Select: '*',
        Table: 'tour_type',
      }

      var response = await SearchData<TourType>(_SQ)
      return response
    },
  })
}

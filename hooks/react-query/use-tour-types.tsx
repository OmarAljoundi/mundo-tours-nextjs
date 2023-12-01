'use client'
import { getTourTypes } from '@/lib/operations'
import { REVALIDATE_TOUR_TYPE } from '@/lib/keys'
import { useQuery } from '@tanstack/react-query'

export default function useTourTypes() {
  return useQuery({
    queryKey: [REVALIDATE_TOUR_TYPE],
    queryFn: async () => await getTourTypes(),
  })
}

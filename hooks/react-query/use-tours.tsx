'use client'
import { getTours } from '@/lib/operations'
import { REVALIDATE_TOUR_LIST } from '@/lib/keys'
import { useQuery } from '@tanstack/react-query'

export default function useTours() {
  return useQuery({
    queryKey: [REVALIDATE_TOUR_LIST],
    queryFn: async () => await getTours(),
  })
}

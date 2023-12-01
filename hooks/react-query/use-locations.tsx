'use client'
import { getDestination } from '@/lib/operations'
import { REVALIDATE_LOCATION_LIST } from '@/lib/keys'
import { useQuery } from '@tanstack/react-query'

export default function useLocations() {
  return useQuery({
    queryKey: [REVALIDATE_LOCATION_LIST],
    queryFn: async () => await getDestination(),
  })
}

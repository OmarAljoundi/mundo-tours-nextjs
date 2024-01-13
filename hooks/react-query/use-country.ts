'use client'
import { getContentData } from '@/lib/operations'
import { REVALIDATE_CONTENT_DATA } from '@/lib/keys'
import { useQuery } from '@tanstack/react-query'
import { getUserCountry } from '@/lib/actions'

export default function useCountry() {
  return useQuery({
    queryKey: ['USER-COUNTRY'],
    queryFn: async () => await getUserCountry(),
  })
}

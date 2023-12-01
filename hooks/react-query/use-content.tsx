'use client'
import { getContentData } from '@/lib/operations'
import { REVALIDATE_CONTENT_DATA } from '@/lib/keys'
import { useQuery } from '@tanstack/react-query'

export default function useContent() {
  return useQuery({
    queryKey: [REVALIDATE_CONTENT_DATA],
    queryFn: async () => await getContentData(),
  })
}

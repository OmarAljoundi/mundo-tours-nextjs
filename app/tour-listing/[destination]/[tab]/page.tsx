export const dynamicParams = true
import Tabs from '@/components/TourListing/tabs'
import Tours from '@/components/TourListing/tours'
import { REVALIDATE_CONTENT_DATA, REVALIDATE_LOCATION_LIST, REVALIDATE_TOUR_LIST, REVALIDATE_TOUR_TYPE } from '@/lib/keys'
import { getContentData, getDestination, getTourTypes, getTours } from '@/lib/operations'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: { destination: string; tab: string } }): Promise<Metadata> {
  const response = (await getDestination())?.results?.find((x) => x.slug == decodeURIComponent(params.destination) && x.is_active)
  const attr = response?.location_attributes?.find((x) => x.title == decodeURIComponent(params.tab.replaceAll('-', ' ')))
  if (!attr) {
    return {
      title: 'No section found',
    }
  }

  const { description, tags, title } = attr.seo || { title: '', description: '', tags: '' }
  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      type: 'website',
      siteName: 'Discovery',
    },
    keywords: tags,
  }
}

export async function generateStaticParams() {
  const response = await getDestination()
  var results: { destination: string; section: string }[] = []

  response?.results
    ?.filter((x) => x.is_active)
    .map((dest) => {
      if (dest.location_attributes && dest.location_attributes.length > 1) {
        dest.location_attributes?.map((attr) => {
          results.push({
            destination: dest.slug!,
            section: attr.title!.replaceAll(' ', '-'),
          })
        })
      }
    })

  return results
}

export default async function TabPage({ params }: { params: { destination: string; tab: string } }) {
  const destination = await getDestination()

  const currentDest = destination.results?.find((x) => x.slug == decodeURIComponent(params.destination) && x.is_active)

  const attr = currentDest?.location_attributes?.find((x) => x.title == decodeURIComponent(params.tab.replaceAll('-', ' ')))
  if (!attr) return notFound()
  const tourIds = attr?.location_tours?.map((x) => x.tour_id!)

  const query = new QueryClient()
  await Promise.allSettled([
    query.prefetchQuery({
      queryKey: [REVALIDATE_LOCATION_LIST],
      queryFn: getDestination,
    }),
    query.prefetchQuery({
      queryKey: [REVALIDATE_TOUR_LIST],
      queryFn: getTours,
    }),
    query.prefetchQuery({
      queryKey: [REVALIDATE_TOUR_TYPE],
      queryFn: getTourTypes,
    }),
    query.prefetchQuery({
      queryKey: [REVALIDATE_CONTENT_DATA],
      queryFn: getContentData,
    }),
  ])

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <Tours tourIds={tourIds} />
    </HydrationBoundary>
  )
}

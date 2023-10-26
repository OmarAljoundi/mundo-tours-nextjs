import Tabs from '@/components/TourListing/tabs'
import Tours from '@/components/TourListing/tours'
import { getDestination, getTours } from '@/lib/operations'
import { Metadata } from 'next'

export async function generateStaticParams() {
  const response = await getDestination()
  var results: { destination: string; tab: string }[] = []

  response?.results?.map((dest) => {
    if (dest.location_attributes && dest.location_attributes.length > 1) {
      dest.location_attributes?.map((attr) => {
        results.push({
          destination: dest.slug!,
          tab: attr.title!.replaceAll(' ', '-'),
        })
      })
    }
  })

  return results
}

export async function generateMetadata({ params }: { params: { destination: string; tab: string } }): Promise<Metadata> {
  const destinationSlug = params.destination
  const response = await getDestination()
  const destination = response?.results?.find((x) => x.slug == decodeURIComponent(destinationSlug))
  const tab = destination?.location_attributes?.find((x) => x.title?.replaceAll(' ', '-') == decodeURIComponent(params.tab))
  if (tab) {
    return {
      title: tab?.seo?.title,
      description: tab?.seo?.description,
      openGraph: {
        title: tab?.seo?.title || '',
        description: tab?.seo?.description || '',
        type: 'website',
        siteName: 'Mundo Tours',
      },
      keywords: tab.seo?.tags || '',
    }
  }
  return {
    title: 'Error - Destination Section not found ',
  }
}
export default async function TabPage({ params }: { params: { destination: string; tab: string } }) {
  const destination = await getDestination()
  const currentDest = destination.results?.find((x) => x.slug == decodeURIComponent(params.destination))

  const attr = currentDest?.location_attributes?.find((x) => x.title == decodeURIComponent(params.tab.replaceAll('-', ' ')))

  let response = await getTours()

  const tours = response?.filter((m) => attr?.location_tours?.map((x) => x.tour_id!).includes(m.id!))

  return (
    <>
      <Tabs currentTab={decodeURIComponent(params.tab)} tabList={currentDest?.location_attributes ?? []} />
      <Tours tours={tours ?? []} />
    </>
  )
}

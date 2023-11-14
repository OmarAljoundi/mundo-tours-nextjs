export const dynamicParams = true
import Tours from '@/components/TourListing/tours'
import { getDestination, getTours } from '@/lib/operations'
import { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

export async function generateStaticParams() {
  const response = await getDestination()
  if (response.success && response.results && response.results.length > 0) {
    return response.results
      .filter((x) => x.is_active)
      .map((dest) => ({
        destination: `${dest.slug}`,
      }))
  }
  return []
}

export async function generateMetadata({ params }: { params: { destination: string } }): Promise<Metadata> {
  const slug = params.destination
  const response = await getDestination()
  const destination = response?.results?.find((x) => x.slug == decodeURIComponent(slug) && x.is_active)

  if (destination) {
    return {
      title: destination?.seo?.title,
      description: destination?.seo?.description,
      openGraph: {
        title: destination?.seo?.title || '',
        description: destination?.seo?.description || '',
        type: 'website',
        images: [destination.image ?? ''],
        siteName: 'Mundo Tours',
      },
      keywords: destination.seo?.tags || '',
    }
  }
  return {
    title: 'Error - Destination not found ',
  }
}

export default async function DestinationPage({ params }: { params: { destination: string } }) {
  let tours_ids: number[] = []
  const destination = await getDestination()
  const currentDest = destination.results?.find((x) => x.slug == decodeURIComponent(params.destination) && x.is_active)

  if (!currentDest) {
    return notFound()
  }

  if (currentDest.location_attributes && currentDest.location_attributes.length >= 2) {
    redirect(`${params.destination}/${currentDest.location_attributes[0].title!.replaceAll(' ', '-')}`)
  }

  currentDest?.location_attributes?.map((x) => {
    tours_ids = [...tours_ids, ...(x.location_tours?.map((g) => g.tour_id) ?? [])]
  })

  let response = (await getTours())?.filter((x) => x.is_active)

  const tours = response?.filter((m) => tours_ids.includes(m.id!))

  return (
    <div className="mt-4 mb-16">
      <Tours tours={tours ?? []} />
    </div>
  )
}

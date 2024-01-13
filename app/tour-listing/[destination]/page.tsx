export const dynamicParams = true
import Tours from '@/components/TourListing/tours'
import { SearchData } from '@/lib/server-actions'
import { Location } from '@/types/custom'
import { Order, SearchQuery } from '@/types/search'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: { destination: string } }): Promise<Metadata> {
  var _SQ: SearchQuery = {
    FilterByOptions: [],
    OrderByOptions: [{ MemberName: 'created_at', SortOrder: Order.DESC }],
    PageIndex: 0,
    PageSize: 1000,
    Select: '*,location_attributes(*,location_tours(*))',
    Table: 'location',
  }
  const response = (await SearchData<Location>(_SQ))?.results?.find((x) => x.slug == decodeURIComponent(params.destination) && x.is_active)
  if (!response) {
    return {
      title: 'No destination found',
    }
  }

  const { description, tags, title } = response.seo || { title: '', description: '', tags: '' }
  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      type: 'website',
      siteName: 'Mundo Tours',
    },
    keywords: tags,
  }
}
export async function generateStaticParams() {
  var _SQ: SearchQuery = {
    FilterByOptions: [],
    OrderByOptions: [{ MemberName: 'created_at', SortOrder: Order.DESC }],
    PageIndex: 0,
    PageSize: 1000,
    Select: '*,location_attributes(*,location_tours(*))',
    Table: 'location',
  }
  const response = await SearchData<Location>(_SQ)
  if (response.success && response.results && response.results.length > 0) {
    return response.results
      .filter((x) => x.is_active)
      .map((dest) => ({
        destination: `${dest.slug}`,
      }))
  }
  return []
}

export default async function DestinationPage({ params }: { params: { destination: string } }) {
  let tours_ids: number[] = []
  var _SQ: SearchQuery = {
    FilterByOptions: [],
    OrderByOptions: [{ MemberName: 'created_at', SortOrder: Order.DESC }],
    PageIndex: 0,
    PageSize: 1000,
    Select: '*,location_attributes(*,location_tours(*))',
    Table: 'location',
  }
  const destination = await SearchData<Location>(_SQ)
  const currentDest = destination.results?.find((x) => x.slug == decodeURIComponent(params.destination) && x.is_active)

  if (!currentDest) return notFound()
  currentDest?.location_attributes?.map((x) => {
    tours_ids = [...tours_ids, ...(x.location_tours?.map((g) => g.tour_id) ?? [])]
  })

  return (
    <div>
      <Tours tourIds={tours_ids} />
    </div>
  )
}

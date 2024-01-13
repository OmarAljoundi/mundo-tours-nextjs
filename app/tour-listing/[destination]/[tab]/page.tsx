export const dynamicParams = true
import Tours from '@/components/TourListing/tours'
import { SearchData } from '@/lib/server-actions'
import { Location } from '@/types/custom'
import { Order, SearchQuery } from '@/types/search'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: { destination: string; tab: string } }): Promise<Metadata> {
  var _SQ: SearchQuery = {
    FilterByOptions: [],
    OrderByOptions: [{ MemberName: 'created_at', SortOrder: Order.DESC }],
    PageIndex: 0,
    PageSize: 1000,
    Select: '*,location_attributes(*,location_tours(*))',
    Table: 'location',
  }
  const response = (await SearchData<Location>(_SQ))?.results?.find((x) => x.slug == decodeURIComponent(params.destination) && x.is_active)
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
  var _SQ: SearchQuery = {
    FilterByOptions: [],
    OrderByOptions: [{ MemberName: 'created_at', SortOrder: Order.DESC }],
    PageIndex: 0,
    PageSize: 1000,
    Select: '*,location_attributes(*,location_tours(*))',
    Table: 'location',
  }
  const response = await SearchData<Location>(_SQ)
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

  const attr = currentDest?.location_attributes?.find((x) => x.title == decodeURIComponent(params.tab.replaceAll('-', ' ')))
  if (!attr) return notFound()
  const tourIds = attr?.location_tours?.map((x) => x.tour_id!)

  return (
    <div>
      <Tours tourIds={tourIds} />
    </div>
  )
}

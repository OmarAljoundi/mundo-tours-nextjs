export const dynamicParams = true
import Tour from '@/components/Tour/tour'
import { getTours } from '@/lib/operations'
import { SearchData } from '@/lib/server-actions'
import { SearchQuery } from '@/types/search'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  var _SQ: SearchQuery = {
    FilterByOptions: [],
    OrderByOptions: [],
    PageIndex: 0,
    PageSize: 1000,
    Select: '*,tour_type(*)',
    Table: 'tour',
  }
  const response = await SearchData<Tour>(_SQ)
  if (response.results && response.results.length > 0) {
    return response.results
      .filter((x) => x.is_active)
      .map((tour) => ({
        tourName: `${tour.slug}`,
      }))
  }
  return []
}

export async function generateMetadata({ params }: { params: { tourName: string } }): Promise<Metadata> {
  const slug = params.tourName
  var _SQ: SearchQuery = {
    FilterByOptions: [],
    OrderByOptions: [],
    PageIndex: 0,
    PageSize: 1000,
    Select: '*,tour_type(*)',
    Table: 'tour',
  }
  const response = await SearchData<Tour>(_SQ)
  const tour = response?.results?.find((x) => x.slug == decodeURIComponent(slug) && x.is_active)
  if (tour) {
    return {
      title: tour?.seo?.title,
      description: tour?.seo?.description,
      openGraph: {
        title: tour?.seo?.title || '',
        description: tour?.seo?.description || '',
        type: 'website',
        images: tour.images ?? [],
        siteName: 'Mundo Tours',
      },
      keywords: tour.seo?.tags || '',
    }
  }
  return {
    title: 'Error - Tour not found ',
  }
}

export default async function TourPage({ params }: { params: { tourName: string } }) {
  var _SQ: SearchQuery = {
    FilterByOptions: [],
    OrderByOptions: [],
    PageIndex: 0,
    PageSize: 1000,
    Select: '*,tour_type(*)',
    Table: 'tour',
  }
  const tours = await SearchData<Tour>(_SQ)
  const tour = tours?.results?.find((x) => x.slug == decodeURIComponent(params.tourName) && x.is_active)

  if (!tour) return notFound()

  return (
    <>
      <Tour tour={tour!} />
    </>
  )
}

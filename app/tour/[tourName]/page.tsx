import Tour from '@/components/Tour/tour'
import { getTours } from '@/lib/operations'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

// export async function generateStaticParams({ params }: { params: { tourName: string } }) {
//   const response = await getTours()
//   if (response && response.length > 0) {
//     return response.map((tour) => ({
//       slug: `${tour.slug}`,
//     }))
//   }
//   return []
// }

export async function generateMetadata({ params }: { params: { tourName: string } }): Promise<Metadata> {
  const slug = params.tourName
  const response = await getTours()
  const tour = response?.find((x) => x.slug == decodeURIComponent(slug))
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
  const tours = await getTours()
  const tour = tours?.find((x) => x.slug == decodeURIComponent(params.tourName))

  return <Tour tour={tour!} />
}

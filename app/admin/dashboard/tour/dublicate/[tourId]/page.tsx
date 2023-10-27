import TourForm from '@/components/tour-form'
import { getTours } from '@/lib/operations'
import { notFound } from 'next/navigation'
import { FunctionComponent } from 'react'

interface NewTourPageProps {
  params: { tourId: string }
}

const DublicateTourPage: FunctionComponent<NewTourPageProps> = async ({ params }) => {
  const tour = (await getTours())?.find((x) => x.id == Number(params.tourId))

  if (!tour) {
    return notFound()
  }
  delete tour.tour_type
  delete tour.id

  return (
    <div className="px-8">
      <div className="flex justify-between">
        <h1 className="text-3xl mt-16"> {tour?.name}</h1>
      </div>
      <TourForm data={tour} />
    </div>
  )
}

export default DublicateTourPage

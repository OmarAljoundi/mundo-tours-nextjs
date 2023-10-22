import { FunctionComponent } from 'react'
import { Button } from '../ui/button'
import ContactForm from '../common/contact-form'
import { generate } from '@/app/tour/[tourName]/pdf-document'
import { Tour } from '@/types/custom'

interface TourLinksProps {
  tour: Tour
}

const TourLinks: FunctionComponent<TourLinksProps> = ({ tour }) => {
  return (
    <div className="p-3 sm:p-4 lg:p-6 bg-[var(--bg-1)] rounded-2xl border border-neutral-40 mb-6 lg:mb-10">
      <h4 className="mb-0 text-2xl font-semibold font-primary">أحجز اللآن</h4>
      <div className="border border-dashed my-5"></div>
      <div className=" my-5">
        <div className="flex gap-6">
          <ContactForm tourId={tour.id!} />
          <Button className="font-primary" size={'sm'} variant={'secondary'} onClick={async () => await generate(tour)}>
            تنزيل البرنامج
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TourLinks

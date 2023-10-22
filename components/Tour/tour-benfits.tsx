import { Tour } from '@/types/custom'
import { Check, Dot, X } from 'lucide-react'
import { FC } from 'react'
const TourBenfits: FC<{ tour: Tour }> = ({ tour }) => {
  return (
    <div className="p-3 sm:p-4 lg:p-6 bg-[var(--bg-1)] rounded-2xl border border-neutral-40 mb-6 lg:mb-10">
      <h4 className="mb-0 text-2xl font-semibold font-primary">مميزات البرنامج</h4>
      <div className="border border-dashed my-5"></div>
      <h6 className="mb-4 font-semibold font-primary"> ما يشمله البرنامج </h6>
      <ul className="flex flex-col gap-4 mb-10">
        {tour?.tour_includes?.map((i) => (
          <li key={i.uuid}>
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 grid place-content-center rounded-full shrink-0 bg-green-700">
                <Check className="las w-6 h-6 p-1 text-lg text-white" />
              </div>
              <div className="grid items-start">
                <span className="font-bold font-primary">{i.title}</span>
                <span className="inline-block font-primary ">
                  <div className="grid items-center flex-wrap">
                    {i.description.split(',').map((i) => (
                      <div className="flex items-center" key={i}>
                        <div>
                          <Dot className="text-green-900 w-6 h-6" />
                        </div>
                        <div>{i}</div>
                      </div>
                    ))}
                  </div>
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <h6 className="mb-4 font-semibold font-primary"> ما لايشمله البرنامج </h6>
      <ul className="flex flex-col gap-4 mb-10">
        {tour?.tour_excludes?.map(({ uuid, description, title }) => (
          <li key={uuid}>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 grid place-content-center rounded-full shrink-0 bg-red-500/80">
                <X className="p-1 text-white" />
              </div>
              <span className="inline-block font-primary">{description}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TourBenfits

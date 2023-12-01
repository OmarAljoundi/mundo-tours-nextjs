'use client'
import TourStory from './tour-story'
import TourBenfits from './tour-benfits'
import TourHotels from './tour-hotels'
import { BedDouble, BedSingle, CalendarDays, Clock7, MapPin, Type } from 'lucide-react'
import BlurImage from '../shared/blur-image'
import Share from './share'
import TourLinks from './tour-links'
import { FC } from 'react'
import { Tour } from '@/types/custom'
import TourPricingList from './tour-pricing-list'

const Tour: FC<{ tour: Tour }> = ({ tour }) => {
  const { id, tour_hotels, images, name, number_of_days, seo, start_day, tour_countries, tour_type, price_double, price_single } = tour
  return (
    <div>
      <div className="bg-secondary/5 p-4">
        <div className="container">
          <div className="flex flex-col-reverse lg:grid  lg:grid-cols-3 lg:gap-x-16 justify-center lg:justify-between  items-start ">
            <div className="flex flex-col-reverse lg:flex-col px-3 sm:px-4 lg:px-6 py-6 col-span-2  bg-white rounded-2xl border border-neutral-40 mb-6 shadow-card w-full">
              <div className="border-t border-dashed lg:border-none">
                <div className="flex justify-between items-center  pt-4 lg:pt-0">
                  <h1 className="text-3xl text-center font-primary">الأسعار</h1>
                  {tour.tour_prices && tour.tour_prices.filter((x) => x.one_price).length > 0 && (
                    <TourPricingList tourPricing={tour.tour_prices.filter((x) => x.one_price)} />
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-between mt-5">
                  <div className="shadow-lg p-5 border rounded-lg">
                    <div className="grid items-center justify-items-center">
                      <div className="bg-primary p-2 rounded-full">
                        <BedSingle className=" text-white " />
                      </div>
                      <h4 className="mt-2  text-base sm:text-sm md:text-sm font-primary">الشخض في الغرفة المزدوجة</h4>
                      <h2 className="text-xl font-bold">{price_double}</h2>
                    </div>
                  </div>
                  <div className="shadow-lg p-5 border rounded-lg">
                    <div className="grid items-center justify-items-center ">
                      <div className="bg-primary p-2 rounded-full">
                        <BedDouble className=" text-white " />
                      </div>
                      <h4 className="mt-2 text-base sm:text-sm md:text-sm font-primary">الشخض في الغرفة المفردة</h4>
                      <h2 className="text-xl font-bold">{price_single}</h2>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid  grid-cols-1 xl:grid-cols-2 xl:gap-x-8  lg:border-t lg:border-dashed mt-4  gap-md-0 divide-y divide-dashed font-primary">
                <div className="py-2 col-span-2">
                  <div className="flex items-center gap-4 ">
                    <div className="bg-primary p-2 rounded-full">
                      <MapPin className=" text-white " />
                    </div>
                    <div className="grid items-center ">
                      <span>الدول</span>
                      <span className="text-primary font-primary">{tour_countries?.map((i) => i)?.join(' - ')}</span>
                    </div>
                  </div>
                </div>

                <div className="py-2 col-span-2">
                  <div className="flex items-center gap-4 ">
                    <div className="bg-primary p-2 rounded-full">
                      <Clock7 className=" text-white " />
                    </div>
                    <div className="grid items-center w-fit">
                      <span>المدة</span>
                      <span>
                        <span className="text-primary">{number_of_days} أيام</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="py-2 col-span-2">
                  <div className="flex justify-between items-end">
                    <div className="flex items-center gap-4 ">
                      <div className="bg-primary p-2 rounded-full">
                        <CalendarDays className=" text-white " />
                      </div>
                      <div className="grid items-center ">
                        <span>تاريخ الرحلة</span>
                        <div
                          className="flex justify-between
                     items-center gap-4"
                        >
                          <span className="text-primary">أيام {start_day} أسبوعياً</span>
                        </div>
                      </div>
                    </div>
                    {/* <DatesData tour={tour} /> */}
                  </div>
                </div>
                <div className="py-2 col-span-2">
                  <div className="flex items-center gap-4 ">
                    <div className="bg-primary p-2 rounded-full">
                      <Type className=" text-white " />
                    </div>
                    <div className="grid items-center ">
                      <span>نوع الرحلة الرحلة</span>
                      <span>
                        <span className="text-primary">{tour_type?.name}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-3 sm:px-4 lg:px-6 py-6 bg-white rounded-2xl border border-neutral-40 mb-6 shadow-card">
              <h1 className="text-3xl text-center font-primary mb-5 ">{name}</h1>
              <BlurImage className="rounded-md" src={images && images.length > 0 ? images[0] : ''} alt={''} quality={100} width={640} height={427} />
              <Share />
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-12">
        <TourStory tour={tour} />
        <TourLinks tour={tour} />

        <TourBenfits tour={tour} />
        {tour_hotels && <TourHotels tour={tour} />}
      </div>
    </div>
  )
}

export default Tour

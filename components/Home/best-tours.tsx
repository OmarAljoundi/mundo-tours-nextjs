'use client'
import { useQuery } from 'react-query'
import TourCard from '../shared/tour-card'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useSetting } from '@/hooks/use-setting'
import { getTours } from '@/lib/operations'
const BestTours = () => {
  const content = useSetting((x) => x.setting)
  const { isLoading, data: response } = useQuery('BestTours', async () => await getTours(), {
    select: (data) => {
      if (content?.best_tours && content?.best_tours?.length > 0) return data?.filter((x) => content.best_tours?.includes(x.id!))
      return []
    },
    refetchInterval: false,
    refetchOnWindowFocus: false,
  })

  return (
    <div className="container">
      <div className="grid grid-cols-12 gap-4 mt-8">
        <div className="col-span-12">
          <Swiper
            loop={true}
            slidesPerView="auto"
            spaceBetween={8}
            navigation={{
              nextEl: '.btn-next',
              prevEl: '.btn-prev',
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              992: {
                slidesPerView: 3,
              },
            }}
            modules={[Navigation]}
            className="swiper choice-slider"
          >
            {response?.map((item, index) => (
              <SwiperSlide className="px-3 my-5" key={index}>
                <article className="col-span-12 sm:col-span-6 xl:col-span-4 px-3 xl:px-0">
                  <TourCard tour={item} key={index} />
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex justify-center gap-4 mt-10">
            <div className="btn-next w-11 h-11 rounded-full border border-[var(--primary)] duration-300 text-2xl text-primary flex items-center justify-center hover:bg-primary hover:text-white cursor-pointer">
              <ArrowRight />
            </div>
            <div className="btn-prev w-11 h-11 rounded-full border border-[var(--primary)] duration-300 text-2xl text-primary flex items-center justify-center hover:bg-primary hover:text-white cursor-pointer">
              <ArrowLeft />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BestTours

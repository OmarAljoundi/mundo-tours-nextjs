'use client'
import TourCard from '../shared/tour-card'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import useContent from '@/hooks/react-query/use-content'
import useTours from '@/hooks/react-query/use-tours'
const BestToursList = () => {
  const { data: content } = useContent()
  const { data } = useTours()

  const getData = () => {
    if (content?.best_tours?.tours && content?.best_tours?.tours?.length > 0) return data?.filter((x) => content.best_tours?.tours?.includes(x.id!))
    return []
  }

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
            {getData()?.map((item, index) => (
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

export default BestToursList

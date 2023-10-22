import React, { useState } from 'react'
import { SwiperSlide, Swiper } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import { Image } from '@nextui-org/react'
import NextImage from 'next/image'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

export default function Carousel({ images }: { images: string[] }) {
  return (
    <div className="relative">
      <Swiper
        className="mySwiper"
        modules={[Pagination, Navigation]}
        pagination={{
          clickable: true,
        }}
        navigation={false}
      >
        {images.map((slide, i) => (
          <SwiperSlide key={i}>
            <Image
              width={1280}
              height={600}
              src={slide}
              alt=""
              loading="lazy"
              className="h-48 rounded-none"
              radius="none"
              classNames={{ wrapper: 'h-48 rounded-none' }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

'use client'
import TourCard from '../shared/tour-card'
import { useState, useEffect, FC } from 'react'
import { useSearchParams } from 'next/navigation'
import { useInView } from 'react-intersection-observer'
import React from 'react'
import { Tour } from '@/types/custom'
import { filterTours } from '@/lib/utils'

const Tours: FC<{ tours: Tour[] }> = ({ tours }) => {
  const searchParams = useSearchParams()
  const { ref, inView } = useInView()
  const [currentSize, setCurrentSize] = useState(10)
  const [currentTours, setCurrentTours] = useState([...tours])

  useEffect(() => {
    console.log(inView)
    if (inView) {
      setCurrentSize(currentSize + 10)
    }
  }, [inView])

  useEffect(() => {
    setCurrentTours(
      filterTours(
        {
          country: searchParams?.get('country') as string,
          days: searchParams?.get('days') as string,
          type: searchParams?.get('type') as string,
          sortMemebr: searchParams?.get('sortMemebr'),
          maxprice: searchParams?.get('maxprice') as any,
          sortOrder: searchParams?.get('sortOrder') as any,
        },
        tours,
      ),
    )
  }, [
    searchParams?.get('country'),
    searchParams?.get('days'),
    searchParams?.get('tab'),
    searchParams?.get('type'),
    searchParams?.get('page'),
    searchParams?.get('maxprice'),
    searchParams?.get('sortMemebr'),
    searchParams?.get('sortOrder'),
  ])

  return (
    <div>
      <div className="grid grid-cols-12 gap-x-2 gap-y-4 lg:gap-8">
        {currentTours?.slice(0, currentSize).map((tour) => (
          <TourContent ref={ref} key={tour.id} {...tour} />
        ))}
      </div>
    </div>
  )
}

export default Tours

const TourContent = React.forwardRef((tour: Tour, ref) => {
  const content = ref ? (
    <article
      className="col-span-12 sm:col-span-6 xl:col-span-4 px-3 xl:px-0"
      //@ts-ignore
      ref={ref}
    >
      <TourCard tour={tour} />
    </article>
  ) : (
    <article className="col-span-12 sm:col-span-6 xl:col-span-4 px-3 xl:px-0">
      <TourCard tour={tour} />
    </article>
  )
  return content
})

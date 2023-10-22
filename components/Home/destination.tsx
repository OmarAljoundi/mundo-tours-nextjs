'use client'
import { cn, getGridClass } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useQuery } from 'react-query'
import DestinationHomeLoading from '../Loading/destination-home-loading'
import { getDestination } from '@/lib/operations'
import { getTotalTours } from '@/lib/helpers'

const Destination = () => {
  const { isLoading, data: response } = useQuery('Locations', async () => await getDestination(), {
    select: (data) => {
      return data.results?.filter((x) => x.is_office == false).sort((a, b) => (a.image?.order ?? 100) - (b.image?.order ?? 200))
    },
    refetchInterval: false,
    enabled: true,
    refetchOnWindowFocus: false,
  })

  return (
    <div className="container">
      {isLoading ? (
        <div className="mt-8">
          <DestinationHomeLoading />{' '}
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-4 mt-8">
          {response?.map((location, index) => (
            <Link
              href={`/tour-listing/${location.name?.replaceAll(' ', '-')}`}
              key={location.id}
              className={cn(
                'block col-span-12',
                location.image?.size == 1
                  ? 'sm:col-span-1'
                  : location.image?.size.toString() == '1/6'
                  ? 'sm:col-span-2'
                  : location.image?.size.toString() == '1/3'
                  ? 'sm:col-span-3'
                  : location.image?.size.toString() == '1/4'
                  ? 'sm:col-span-4'
                  : location.image?.size.toString() == '1/5'
                  ? 'sm:col-span-5'
                  : location.image?.size.toString() == '1/2'
                  ? 'sm:col-span-6'
                  : location.image?.size == 7
                  ? 'sm:col-span-7'
                  : location.image?.size == 8
                  ? 'sm:col-span-8'
                  : location.image?.size == 9
                  ? 'sm:col-span-9'
                  : location.image?.size == 10
                  ? 'sm:col-span-10'
                  : location.image?.size == 11
                  ? 'sm:col-span-11'
                  : 'col-span-12',
              )}
            >
              <div className="relative rounded-2xl group transition-all duration-500">
                <div className="listing-card__img">
                  <Image src={location.image?.url || ''} alt="image" className=" w-full rounded-2xl" width={400} height={307} quality={60} />
                </div>
                <div
                  className="absolute top-0 left-0 flex flex-col justify-between h-full w-full before:w-full 
                before:absolute before:h-full before:bottom-0 before:left-0 before:bg-gradient-to-t 
                 before:from-black/40 before:rounded-2xl  group-hover:before:transition-all group-hover:before:duration-500 group-hover:before:blur-2xl before:to-black/50 group-hover:after:w-full group-hover:after:absolute 
                 "
                >
                  <div className=" items-end px-5 pb-5 flex flex-wrap w-full gap-4 h-full justify-between z-10">
                    <div>
                      <div className="flex gap-2 items-center">
                        <i className="las la-map-marker-alt text-3xl text-[#9C742B]"></i>
                        <h4 className="text-xl sm:text-base lg:text-2xl text-white font-semibold">{location.name}</h4>
                      </div>
                    </div>
                    <div
                      className="inline-flex text-xs rounded-2xl px-4 py-2
                     items-center bg-white/50 group-hover:bg-white/70  justify-center  duration-300 font-primary"
                    >
                      {getTotalTours(location)} رحلات
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Destination

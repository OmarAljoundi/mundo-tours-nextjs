'use client'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useQuery } from 'react-query'
import DestinationHomeLoading from '../Loading/destination-home-loading'
import { getDestination } from '@/lib/operations'
import { getTotalTours } from '@/lib/helpers'
import { motion } from 'framer-motion'
import { CONTAINER_DEST_VAR, CONTAINER_VAR, ITEMS_VAR } from '@/lib/animations'
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
          <DestinationHomeLoading />
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
              <motion.div
                variants={CONTAINER_DEST_VAR}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative rounded-2xl group transition-all duration-500"
              >
                <div className="listing-card__img">
                  <Image src={location.image?.url || ''} alt="image" className=" w-full rounded-2xl" width={1280} height={720} quality={90} />
                </div>
                <div
                  className="absolute top-0 left-0 flex flex-col justify-between h-full w-full before:w-full 
                before:absolute before:h-full before:bottom-0 before:left-0 before:bg-gradient-to-t 
                 before:from-black/10 before:rounded-2xl  group-hover:before:transition-all group-hover:before:duration-500 group-hover:before:blur-2xl before:to-black/10 group-hover:after:w-full group-hover:after:absolute 
                 "
                >
                  <div className=" items-end px-5 pb-5 flex flex-wrap w-full gap-4 h-full justify-between z-10">
                    <div>
                      <motion.figcaption
                        variants={{ ...ITEMS_VAR }}
                        transition={{
                          delay: 0.5,
                          duration: 0.5,
                        }}
                        className="absolute p-2 bottom-2 right-2 max-w-[170px]   left-0  sm:left-5 flex   justify-between  border border-white
                      bg-white/75 rounded-xl shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm"
                      >
                        <div>
                          <h1 className="text-base  text-secondary font-primary text-ellipsis line-clamp-1 overflow-hidden">{location.name}</h1>
                        </div>
                      </motion.figcaption>
                    </div>
                    <div>
                      <motion.figcaption
                        variants={{ ...ITEMS_VAR }}
                        transition={{
                          delay: 0.5,
                          duration: 0.5,
                        }}
                        className="absolute p-2 bottom-2 left-2 max-w-[170px]    sm:left-5 flex   justify-between  border border-white
                      bg-white/75 rounded-xl shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm"
                      >
                        <div>
                          <h1 className="text-base  text-secondary font-primary text-ellipsis line-clamp-1 overflow-hidden">
                            {getTotalTours(location)}
                          </h1>
                        </div>
                      </motion.figcaption>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Destination

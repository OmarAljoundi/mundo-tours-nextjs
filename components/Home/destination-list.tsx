'use client'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { getTotalTours } from '@/lib/helpers'
import { motion } from 'framer-motion'
import { CONTAINER_DEST_VAR, ITEMS_VAR } from '@/lib/animations'
import useLocations from '@/hooks/react-query/use-locations'
const DestinationList = () => {
  const { data: response } = useLocations()
  const getData = () => response?.results?.filter((x) => x.is_office == false).sort((a, b) => (a.image?.order ?? 100) - (b.image?.order ?? 200)) || []

  return (
    <div className="grid grid-cols-12 gap-4 mt-8">
      {getData().map((location, index) => (
        <Link
          href={`/tour-listing/${location.slug}`}
          key={location.id}
          scroll={true}
          className={cn(
            'block col-span-12 md:col-span-6',
            location.image?.size == 1
              ? 'lg:col-span-1'
              : location.image?.size.toString() == '1/6'
              ? 'lg:col-span-2'
              : location.image?.size.toString() == '1/3'
              ? 'lg:col-span-3'
              : location.image?.size.toString() == '1/4'
              ? 'lg:col-span-4'
              : location.image?.size.toString() == '1/5'
              ? 'lg:col-span-5'
              : location.image?.size.toString() == '1/2'
              ? 'lg:col-span-6'
              : location.image?.size == 7
              ? 'lg:col-span-7'
              : location.image?.size == 8
              ? 'lg:col-span-8'
              : location.image?.size == 9
              ? 'lg:col-span-9'
              : location.image?.size == 10
              ? 'lg:col-span-10'
              : location.image?.size == 11
              ? 'lg:col-span-11'
              : 'col-span-12',
          )}
        >
          <motion.div
            variants={CONTAINER_DEST_VAR}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative md:rounded-2xl group transition-all duration-500"
          >
            <div className="listing-card__img">
              <Image
                src={location.image?.url || ''}
                alt="image"
                className=" w-full rounded-sm md:rounded-2xl"
                width={746}
                height={362}
                quality={80}
              />
            </div>
            <div
              className="absolute top-0 left-0 flex flex-col justify-between h-full w-full before:w-full 
                before:absolute before:h-full before:bottom-0 before:left-0 before:bg-gradient-to-t 
                 before:from-black/10 before:rounded-2xl  group-hover:before:transition-all group-hover:before:duration-500 group-hover:before:blur-2xl
                  before:to-black/10 group-hover:after:w-full group-hover:after:absolute 
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
                    className="absolute p-2 bottom-2 right-2  w-fit  left-0  sm:left-5 flex   justify-between  border border-white
                      bg-white/75 rounded-xl shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm"
                  >
                    <div>
                      <h1 className="text-base  md:text-sm xl:text-base text-secondary font-primary text-ellipsis line-clamp-1 overflow-hidden">
                        {location.name}
                      </h1>
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
                      <h1 className="text-base  md:text-sm xl:text-base text-secondary font-primary text-ellipsis line-clamp-1 overflow-hidden">
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
  )
}

export default DestinationList

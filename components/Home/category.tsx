'use client'

import Image from 'next/image'
import { useQuery } from 'react-query'
import { Button } from '../ui/button'
import Link from 'next/link'
import { getTourTypes } from '@/lib/operations'
import { motion } from 'framer-motion'
import { CONTAINER_VAR, ITEMS_VAR } from '@/lib/animations'
const Category = () => {
  const { isLoading, data: response } = useQuery('TourTypes', async () => await getTourTypes())

  return (
    <div className="container">
      <div className="grid grid-cols-2 lg:grid-cols-5 mt-8 gap-4">
        {response?.results?.map((i) => (
          <motion.div key={i.id} className="w-full" variants={CONTAINER_VAR} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.div
              variants={{ ...ITEMS_VAR }}
              transition={{
                delay: 0.5,
                duration: 0.5,
              }}
              className="grid justify-items-center p-4 border-2 border-dashed border-primary rounded-2xl gap-4 shadow-xl"
            >
              <Image src={i.image ?? ''} width={50} height={50} alt={i.name ?? ''} />
              <h4 className="font-primary text-xl">{i.name}</h4>
              <Link href={`/tour-listing?type=${i.name}`}>
                <Button>المزيد</Button>
              </Link>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Category

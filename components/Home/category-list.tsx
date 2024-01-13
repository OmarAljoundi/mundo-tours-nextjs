'use client'
import Image from 'next/image'
import { Button } from '../ui/button'
import Link from 'next/link'
import useTourTypes from '@/hooks/react-query/use-tour-types'
const CategoryList = () => {
  const { data: response } = useTourTypes()

  return (
    <div className="container">
      <div className="grid grid-cols-2 lg:grid-cols-5 mt-8 gap-4">
        {response?.results?.map((i) => (
          <div key={i.id} className="w-full">
            <div className="grid justify-items-center p-4 border-2 border-dashed border-primary rounded-2xl gap-4 shadow-xl">
              <Image src={i.image ?? ''} width={50} height={50} alt={i.name ?? ''} />
              <h4 className="font-primary text-xl">{i.name}</h4>
              <Link href={`/tour-listing?type=${i.name}`}>
                <Button>المزيد</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryList

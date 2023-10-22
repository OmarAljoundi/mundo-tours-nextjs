import CardAdd from '@/components/shared/card-add'
import { FunctionComponent } from 'react'
import CardDetails from './card-details'
import { Separator } from '@/components/ui/separator'
import { getHotels } from '@/lib/operations'

interface CardListProps {}

const CardList: FunctionComponent<CardListProps> = async () => {
  const data = await getHotels()

  return (
    <div className=" lg:px-4 ">
      <div className=" h-full flex-1 flex-col space-y-8 p-8 flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <p className="text-muted-foreground">Here&apos;s a list of your hotels!</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-x-4 gap-y-8">
          <CardAdd trigger="onOpenHotel" title="Click to create new hotel" />
          {data?.map((hotel) => (
            <CardDetails {...hotel} key={hotel.id} />
          ))}
        </div>
        <Separator />
      </div>
    </div>
  )
}

export default CardList

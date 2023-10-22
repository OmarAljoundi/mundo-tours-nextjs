import { REVALIDATE_LOCATION_LIST } from '@/lib/keys'
import { http } from '@/service/httpService'
import { Location, Response } from '@/types/custom'
import { SearchQuery } from '@/types/search'
import { FC } from 'react'
import CardDetails from '../card-detalis'
import { Separator } from '@/components/ui/separator'
import CardAdd from '@/components/shared/card-add'
interface DestinationPageProps {}

const DestinationPage: FC<DestinationPageProps> = async () => {
  var _SQ: SearchQuery = {
    FilterByOptions: [],
    OrderByOptions: [],
    PageIndex: 0,
    PageSize: 1000,
    Select: '*,location_attributes(*,location_tours(*))',
    Table: 'location',
  }
  const data = await http<Response<Location>>('/api/search', {
    revalidate: 86400,
    tags: [REVALIDATE_LOCATION_LIST],
  }).post(_SQ)
  return (
    <div className=" lg:px-4 ">
      <div className=" h-full flex-1 flex-col space-y-8 p-8 flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h1 className="text-xl">Office Destinations</h1>
            <p className="text-muted-foreground text-sm">Here&apos;s a list of your office destinations!</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-x-4 gap-y-8">
          <CardAdd trigger="onOpenDestinationOffice" title="Click to create new office destination" />
          {data?.results
            ?.filter((x) => x.is_office == true)
            .map((location) => (
              <CardDetails {...location} key={location.id} />
            ))}
        </div>
        <Separator />
      </div>
    </div>
  )
}

export default DestinationPage

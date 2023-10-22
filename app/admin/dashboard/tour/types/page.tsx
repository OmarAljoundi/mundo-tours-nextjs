import { DataTable } from '@/components/table/data-table'
import { FunctionComponent } from 'react'
import { columns, filterOptions } from './columns'
import { http } from '@/service/httpService'
import { Response, TourType } from '@/types/custom'
import { SearchQuery } from '@/types/search'
import { REVALIDATE_TOUR_TYPE } from '@/lib/keys'

interface TourTypePageProps {}

const TourTypePage: FunctionComponent<TourTypePageProps> = async () => {
  var _SQ: SearchQuery = {
    FilterByOptions: [],
    OrderByOptions: [],
    PageIndex: 0,
    PageSize: 1000,
    Select: '*',
    Table: 'tour_type',
  }
  const data = await http<Response<TourType>>('/api/search', { revalidate: 86400, tags: [REVALIDATE_TOUR_TYPE] }).post(_SQ)

  return (
    <div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <p className="text-muted-foreground">Here&apos;s a list of your tour types!</p>
          </div>
        </div>
        <DataTable data={data.results ?? []} columns={columns} filters={filterOptions} trigger="onOpenTourType" />
      </div>
    </div>
  )
}

export default TourTypePage

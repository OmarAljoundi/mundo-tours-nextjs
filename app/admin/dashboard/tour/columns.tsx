'use client'
import { format } from 'date-fns'
import { ColumnDef, Table } from '@tanstack/react-table'
import { DataTableColumnHeader } from '@/components/table/data-table-column-header'
import { DataTableAction } from '@/components/table/data-table-actions'
import { supabaseClient } from '@/lib/supabaseClient'
import { Filters } from '@/hooks/use-filter-modal'
import { Tour } from '@/types/custom'
import { Avatar, Button, Chip, Switch } from '@nextui-org/react'
import { toast } from 'sonner'
import { updateTourStatus } from '@/lib/operations'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SelectOptionsProps } from '@/hooks/use-select-options-modal'
import { DataTableSearchInput } from '@/components/table/data-table-search-input'
import { DataTableDateFilter } from '@/components/table/data-table-date-filter'
import { DataTableFacetedFilter } from '@/components/table/data-table-faceted-filter'
import { DAYS } from '@/lib/constants'
import { REVALIDATE_TOUR_LIST } from '@/lib/keys'
import { AlertCircle, ExternalLink } from 'lucide-react'

export const columns: ColumnDef<Tour>[] = [
  {
    accessorKey: 'images',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Main Image" />,
    cell: ({ row }) => {
      const image = row.original.images && row.original.images.length > 0 ? row.original.images[0] : ''
      return <Avatar src={image} className="max-w-[6rem] truncate" />
    },
    filterFn: (row, id, value) => {
      return row.original.name?.includes(value) || false
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tour Name" />,
    cell: ({ row }) => {
      return (
        <div className="w-32 flex items-center justify-between">
          <span className="max-w-[6rem] truncate">{row.getValue('name')}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return row.original.name?.includes(value) || false
    },
  },
  {
    accessorKey: 'start_day',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Start Day" />,
    cell: ({ row }) => {
      return (
        <div className="w-40 flex items-center justify-start">
          {row.original.start_day?.slice(0, 2)?.map((item) => (
            <Chip className="px-2 rounded-none" variant={'dot'} color="primary" key={item}>
              {item}
            </Chip>
          ))}
          {row.original.start_day && row.original.start_day?.length > 2 && (
            <Chip className="px-2 rounded-none" variant={'dot'} color="danger">
              + {row.original.start_day.length - 2}
            </Chip>
          )}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return (
        //@ts-ignore
        row.original.start_day?.filter((x) => (value as string[]).includes(x))?.length > 0 || false
      )
    },
  },
  {
    accessorKey: 'price_double',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Price Double" />,
    cell: ({ row }) => {
      return (
        <div className="w-32 flex items-center justify-between">
          <span className="max-w-[6rem] truncate">{row.getValue('price')}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'number_of_days',
    header: ({ column }) => <DataTableColumnHeader column={column} title="#Of days" />,
    cell: ({ row }) => (
      <div className="w-32 flex items-center justify-between">
        <span className="max-w-[6rem] truncate">{row.getValue('number_of_days')}</span>
      </div>
    ),
    filterFn: (row, id, value) => {
      return true
    },
  },
  {
    accessorKey: 'tour_type',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
    cell: ({ row }) => (
      <div className="w-32 flex items-center justify-between">
        <Chip className="max-w-[6rem] truncate">{row.original.tour_type?.name}</Chip>
      </div>
    ),
    filterFn: (row, id, value) => {
      return (value as string[]).includes(row.original.tour_type?.name ?? '')
    },
  },
  {
    accessorKey: 'slug',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Url" />,
    cell: ({ row }) => {
      if (row.original.slug) {
        return (
          <div className="w-32 flex items-center justify-between">
            <Button
              endContent={<ExternalLink />}
              as={'a'}
              href={`${process.env.NEXT_PUBLIC_URL}/tour/${row.original.slug}`}
              size="sm"
              color="success"
              variant="bordered"
            >
              <span className="w-24 truncate text-ellipsis overflow-hidden">Visit Page</span>
            </Button>
          </div>
        )
      }
      return (
        <div className="w-32 flex items-center justify-between">
          <Button
            endContent={<AlertCircle />}
            as={'a'}
            href={`${process.env.NEXT_PUBLIC_URL}/tour/${row.original.slug}`}
            size="sm"
            color="primary"
            variant="bordered"
          >
            <span className="w-24 truncate text-ellipsis overflow-hidden">Need to set slug!</span>
          </Button>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return (value as string[]).includes(row.original.tour_type?.name ?? '')
    },
  },
  {
    accessorKey: 'is_active',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const route = useRouter()
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [active, setActive] = useState<boolean>(row.original.is_active ?? false)
      const handleUpdateStatus = async (e: boolean) => {
        setActive(e)
        toast.promise(updateTourStatus(e, row.original.id!), {
          error(error) {
            setActive(!e)
            return error
          },
          loading: 'Loading delete ..',
          success(data) {
            route.refresh()
            return data.message
          },
        })
      }
      return (
        <div className="w-32 flex items-center justify-between">
          <Switch defaultSelected size="sm" isSelected={active} onValueChange={(e) => handleUpdateStatus(e)} />
        </div>
      )
    },
    filterFn: (row, id, value) => {
      if (value == 'Published' && row.original.is_active == true) return true

      if (value == 'Draft' && row.original.is_active == false) return true

      return false
    },
  },
  {
    accessorKey: 'created_at',
    sortingFn: 'datetime',
    sortDescFirst: true,
    header: ({ column }) => <DataTableColumnHeader column={column} title="CreatedAt" />,
    cell: ({ row }) => <div className="w-[100px] truncate">{format(new Date(row.original.created_at!), 'yyyy-MM-dd')}</div>,
    filterFn: (row, id, value) => {
      var from = true
      var to = true
      if (value?.from) {
        from = new Date(value.from as string) <= new Date(row.original.created_at!)
      }
      if (value?.to) {
        to = new Date(value.to as string) >= new Date(row.original.created_at!)
      }

      return from && to
    },
  },

  {
    id: 'actions',
    cell: ({ row }) => (
      <DataTableAction
        row={row}
        actions={[
          {
            label: 'Edit',
            link: `/admin/dashboard/tour/edit/${row.original.id}`,
            type: 'Link',
          },
          {
            label: 'Delete',
            type: 'Promise',
            action: async () => {
              const { data, error } = await supabaseClient.from('tour').delete().eq('id', row.original.id!)
              if (error) {
                console.log(error)
                throw new Error(`Error while deleting the tour ${error.message}`)
              }
              await fetch(`/api/revalidate?tag=${REVALIDATE_TOUR_LIST}`)
              return {
                success: true,
                message: 'Tour deleted successfully',
              }
            },
          },
        ]}
      />
    ),
  },
]

export const filterOptions: Filters[] = [
  {
    renderFilter: (table: Table<Tour>) => {
      return <DataTableSearchInput column={table?.getColumn('name')} placeholder="Search by tour name" title="Search tour" />
    },
  },
  {
    renderFilter: (table: Table<Tour>) => {
      return <DataTableDateFilter column={table?.getColumn('created_at')} title={'Created Date'} />
    },
  },
  {
    renderFilter: (table: Table<Tour>) => {
      return <DataTableFacetedFilter column={table?.getColumn('tour_type')} title={'Types'} multi={true} />
    },
  },
  {
    renderFilter: (table: Table<Tour>) => {
      return <DataTableFacetedFilter column={table?.getColumn('start_day')} title={'Days'} multi={true} customOptions={DAYS} />
    },
  },

  {
    renderFilter: (table: Table<Tour>) => {
      return <DataTableFacetedFilter column={table?.getColumn('is_active')} title={'Status'} multi={false} customOptions={['Published', 'Draft']} />
    },
  },
]

export const selectOptions: SelectOptionsProps[] = []

'use client'
import { format } from 'date-fns'
import { ColumnDef, Table } from '@tanstack/react-table'
import { DataTableColumnHeader } from '@/components/table/data-table-column-header'
import { DataTableAction } from '@/components/table/data-table-actions'
import { supabaseClient } from '@/lib/supabaseClient'
import { Filters } from '@/hooks/use-filter-modal'
import { Office, Tour } from '@/types/custom'
import { Avatar, Button, Chip, Switch } from '@nextui-org/react'
import { toast } from 'sonner'
import { updateOfficeStatus } from '@/lib/operations'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SelectOptionsProps } from '@/hooks/use-select-options-modal'
import { DataTableSearchInput } from '@/components/table/data-table-search-input'
import { DataTableDateFilter } from '@/components/table/data-table-date-filter'
import { DataTableFacetedFilter } from '@/components/table/data-table-faceted-filter'
import { REVALIDATE_OFFICE_LIST } from '@/lib/keys'
import { ExternalLink } from 'lucide-react'

export const columns: ColumnDef<Office>[] = [
  {
    accessorKey: 'image',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Logo" />,
    cell: ({ row }) => {
      return <Avatar src={row.original.logo ?? ''} className="max-w-[6rem] truncate" />
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Office Name" />,
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
    accessorKey: 'contact_number',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Contact Number" />,
    cell: ({ row }) => {
      return (
        <div className="w-40 flex items-center justify-start">
          <Chip className="px-2 rounded-none" variant={'dot'} color="primary">
            {row.original.contact_number}
          </Chip>
        </div>
      )
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    cell: ({ row }) => {
      return (
        <div className="w-32 flex items-center justify-between">
          <span className="max-w-[6rem] truncate">{row.original.email}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'slug',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Url" />,
    cell: ({ row }) => (
      <div className="w-32 flex items-center justify-between">
        <Button
          endContent={<ExternalLink />}
          as={'a'}
          href={`https://${row.original.slug}.imtour.travel`}
          size="sm"
          color="primary"
          variant="bordered"
        >
          <span className="w-24 truncate text-ellipsis overflow-hidden">{row.original.slug}</span>
        </Button>
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const route = useRouter()
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [active, setActive] = useState<boolean>(row.original.status ?? false)
      const handleUpdateStatus = async (e: boolean) => {
        setActive(e)
        toast.promise(updateOfficeStatus(e, row.original.id!), {
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
      if (value == 'Active' && row.original.status == true) return true

      if (value == 'Inactive' && row.original.status == false) return true

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
    enablePinning: true,
    cell: ({ row }) => (
      <DataTableAction
        row={row}
        actions={[
          {
            label: 'Edit',
            action: 'onOpenOffice',
            type: 'Trigger',
          },
          {
            label: 'Delete',
            type: 'Promise',
            action: async () => {
              const { data, error } = await supabaseClient.from('office').delete().eq('id', row.original.id!)
              if (error) {
                console.log(error)
                throw new Error(`Error while deleting the office ${error.message}`)
              }
              await fetch(`/api/revalidate?tag=${REVALIDATE_OFFICE_LIST}`)
              return {
                success: true,
                message: 'Office deleted successfully',
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
      return <DataTableSearchInput column={table?.getColumn('name')} placeholder="Search by office name" title="Search tour" />
    },
  },
  {
    renderFilter: (table: Table<Tour>) => {
      return <DataTableDateFilter column={table?.getColumn('created_at')} title={'Created Date'} />
    },
  },

  {
    renderFilter: (table: Table<Tour>) => {
      return <DataTableFacetedFilter column={table?.getColumn('status')} title={'Status'} multi={false} customOptions={['Active', 'Inactive']} />
    },
  },
]

export const selectOptions: SelectOptionsProps[] = [
  {
    title: 'Create new office',
    requireSelections: false,
    action: 'onOpenOffice',
  },
]

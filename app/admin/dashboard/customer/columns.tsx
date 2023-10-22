'use client'
import { format } from 'date-fns'
import { ColumnDef, Table } from '@tanstack/react-table'
import { DataTableColumnHeader } from '@/components/table/data-table-column-header'
import { DataTableAction } from '@/components/table/data-table-actions'
import { supabaseClient } from '@/lib/supabaseClient'
import { Filters } from '@/hooks/use-filter-modal'
import { Customer, Tour } from '@/types/custom'
import { Chip, Tooltip } from '@nextui-org/react'
import { SelectOptionsProps } from '@/hooks/use-select-options-modal'
import { DataTableSearchInput } from '@/components/table/data-table-search-input'
import { DataTableDateFilter } from '@/components/table/data-table-date-filter'
import { DataTableFacetedFilter } from '@/components/table/data-table-faceted-filter'
import { CUSTOMER_STATUS } from '@/lib/constants'
import { REVALIDATE_CUSTOMER_LIST } from '@/lib/keys'
import { eCustomerStatus } from '@/interface/Customer'

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Customer Id" />,
    cell: ({ row }) => <div className="w-[80px]">#{row.getValue('id')}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Customer Name" />,
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
    accessorKey: 'phone_number',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Customer Phone" />,
    cell: ({ row }) => {
      return (
        <div className="w-32 flex items-center justify-between">
          <span className="max-w-[6rem] truncate">{row.getValue('phone_number')}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      //@ts-ignore
      return true
    },
  },
  {
    accessorKey: 'expected_travel_date',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Excepted Date" />,
    cell: ({ row }) => {
      return (
        <div className="w-32 flex items-center justify-between">
          {row.getValue('expected_travel_date') ? format(new Date(row.getValue('expected_travel_date')), 'yyyy-MM-dd') : 'Not specified'}
        </div>
      )
    },
  },

  {
    accessorKey: 'notes',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Notes" />,
    cell: ({ row }) => {
      return (
        <Tooltip
          content={
            <div className="px-1 py-2">
              <div className="text-small font-bold">Custom Note</div>
              <div className="text-tiny break-words" style={{ inlineSize: '150px' }}>
                {row.original.notes}
              </div>
            </div>
          }
        >
          <div className="w-32 flex items-center justify-between truncate">
            <span className="text-ellipsis overflow-hidden">{row.original.notes}</span>
          </div>
        </Tooltip>
      )
    },
    filterFn: (row, id, value) => {
      return true
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.original.status
      return (
        <div className="w-32 flex items-center justify-between">
          <Chip color={eCustomerStatus.Completed == status ? 'success' : eCustomerStatus.No_Answer == status ? 'warning' : 'primary'}>
            {status == eCustomerStatus.Completed ? 'Completed!' : status == eCustomerStatus.No_Answer ? 'No answer' : 'Pending'}
          </Chip>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      const status =
        row.original.status == eCustomerStatus.Completed ? 'Completed' : row.original.status == eCustomerStatus.No_Answer ? 'No_Answer' : 'Pending'
      return (value as string[]).includes(status)
    },
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => <DataTableColumnHeader column={column} title="CreatedAt" />,
    cell: ({ row }) => <div className="w-[100px] truncate">{format(new Date(row.getValue('created_at')), 'yyyy-MM-dd')}</div>,
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
    cell: ({ row }) => {
      const updateStatus = async (status: number) => {
        const { data, error } = await supabaseClient.from('customer').update({ status: status }).eq('id', row.original.id!)
        if (error) {
          throw new Error(error.details)
        }
        await fetch(`/api/revalidate?tag=${REVALIDATE_CUSTOMER_LIST}`)
        return {
          success: true,
          message: 'Customer updated successfully',
        }
      }

      const markAsResponded = {
        label: 'Completed',
        type: 'Promise' as any,
        action: async () => await updateStatus(eCustomerStatus.Completed),
      }

      const markAsNoResponded = {
        label: 'No Answer',
        type: 'Promise' as any,
        action: async () => await updateStatus(eCustomerStatus.No_Answer),
      }

      const actions = []

      if (row.original.status == eCustomerStatus.Pending) {
        actions.push(markAsResponded)
        actions.push(markAsNoResponded)
      }

      return (
        <DataTableAction
          row={row}
          actions={[
            ...actions,
            {
              label: 'Delete',
              type: 'Promise',
              action: async () => {
                const { data, error } = await supabaseClient.from('customer').delete().eq('id', row.original.id!)
                if (error) {
                  return {
                    success: false,
                    message: error.details,
                  }
                }
                await fetch(`/api/revalidate?tag=${REVALIDATE_CUSTOMER_LIST}`)
                return {
                  success: true,
                  message: 'Customer deleted successfully',
                }
              },
            },
          ]}
        />
      )
    },
  },
]

export const filterOptions: Filters[] = [
  {
    renderFilter: (table: Table<Tour>) => {
      return <DataTableSearchInput column={table?.getColumn('name')} placeholder="Search by customer name" title="Search customer" />
    },
  },
  {
    renderFilter: (table: Table<Tour>) => {
      return <DataTableDateFilter column={table?.getColumn('created_at')} title={'Created Date'} />
    },
  },
  {
    renderFilter: (table: Table<Tour>) => {
      return <DataTableDateFilter column={table?.getColumn('expected_travel_date')} title={'Expected travel'} />
    },
  },
  {
    renderFilter: (table: Table<Tour>) => {
      const options = ['Pending', 'Completed', 'No_Answer']
      return <DataTableFacetedFilter column={table?.getColumn('status')} customOptions={options} title={'Status'} multi={true} />
    },
  },
]

export const selectOptions: SelectOptionsProps[] = []

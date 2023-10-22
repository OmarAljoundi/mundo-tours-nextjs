'use client'
import { Table } from '@tanstack/react-table'
import { DataTableViewOptions } from './data-table-view-options'
import { useFilterModal } from '@/hooks/use-filter-modal'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const filterOptions = useFilterModal()
  return (
    <div className="grid gap-y-4">
      <div className="flex flex-1 items-center flex-wrap gap-y-2">{filterOptions?.filters?.map((render) => render.renderFilter(table))}</div>

      <DataTableViewOptions table={table} />
    </div>
  )
}

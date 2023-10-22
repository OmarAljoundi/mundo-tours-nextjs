import * as React from 'react'
import { CheckIcon, PlusCircledIcon } from '@radix-ui/react-icons'
import { Column } from '@tanstack/react-table'

import useDebounce from '@/hooks/useDebounce'
import { Input } from '@nextui-org/react'
import { SearchIcon } from 'lucide-react'

export type FacetedOptions = {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
}
interface DataTableSearchInputProp<TData, TValue> {
  column?: Column<TData, TValue>
  title?: string
  placeholder?: string
}

export function DataTableSearchInput<TData, TValue>({ column, title, placeholder }: DataTableSearchInputProp<TData, TValue>) {
  const [value, setValue] = React.useState<string>('')
  const debouncedValue = useDebounce<string>(value, 750)

  React.useEffect(() => {
    column?.setFilterValue(value)
  }, [debouncedValue])

  React.useEffect(() => {
    if (column?.getFilterValue() == undefined) {
      setValue('')
    }
  }, [column?.getFilterValue()])
  return (
    <div className="w-1/2 lg:w-1/4 xl:w-1/6">
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className=" w-[calc(100%-10px)]  border-dashed"
        startContent={<SearchIcon className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />}
      />
    </div>
  )
}

import * as React from 'react'
import { CheckIcon, PlusCircledIcon } from '@radix-ui/react-icons'
import { Column } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { Badge } from '../ui/badge'
import { Button } from '@nextui-org/react'

interface DataTableFacetedFilter<TData, TValue> {
  column?: Column<TData, TValue>
  title?: string
  customOptions?: any[]
  multi?: boolean
}

export function DataTableFacetedFilter<TData, TValue>({ column, title, customOptions, multi }: DataTableFacetedFilter<TData, TValue>) {
  const facets = column?.getFacetedUniqueValues()
  const selectedValues = new Set(column?.getFilterValue() as string[])
  const arrayOptions = facets ? Array.from(facets.keys())?.map((x) => x?.name) : customOptions

  const options = customOptions ? customOptions : new Set(arrayOptions)

  return (
    <div className={cn('grid xl:gap-2 w-1/2 lg:w-1/4 xl:w-1/6')}>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="flat" className="w-[calc(100%-10px)]">
            <PlusCircledIcon className="mr-2 h-4 w-4" />
            {title}
            {selectedValues?.size > 0 && (
              <>
                <Separator orientation="vertical" className="mx-2 h-4" />
                <Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden">
                  {selectedValues.size}
                </Badge>
                <div className="hidden space-x-1 lg:flex">
                  <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                    {selectedValues.size} selected
                  </Badge>
                </div>
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <Command>
            <CommandInput placeholder={title} />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {Array.from(options)?.map((option) => {
                  const isSelected = selectedValues.has(option)
                  return (
                    <CommandItem
                      key={option}
                      onSelect={() => {
                        if (isSelected) {
                          selectedValues.delete(option)
                        } else {
                          !multi ? selectedValues.clear() : {}
                          selectedValues.add(option)
                        }
                        const filterValues = Array.from(selectedValues)
                        column?.setFilterValue(filterValues.length ? filterValues : undefined)
                      }}
                    >
                      <div
                        className={cn(
                          'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                          isSelected ? 'bg-primary text-primary-foreground' : 'opacity-50 [&_svg]:invisible',
                        )}
                      >
                        <CheckIcon className={cn('h-4 w-4')} />
                      </div>
                      <span>{option}</span>
                      {facets?.get(option) && (
                        <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">{facets.get(option)}</span>
                      )}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
              {selectedValues.size > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup>
                    <CommandItem onSelect={() => column?.setFilterValue(undefined)} className="justify-center text-center">
                      Clear filters
                    </CommandItem>
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

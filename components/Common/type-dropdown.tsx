'use client'
import { useEffect, useState, FC } from 'react'
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList, CommandSeparator } from '../ui/command'

import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Check, Plus, X } from 'lucide-react'
import { QueryString, cn, daysFilter, europeanCountries } from '@/lib/utils'
import { Separator } from '../ui/separator'
import qs from 'query-string'
import { usePathname, useRouter } from 'next/navigation'
import { TourType } from '@/types/custom'

const TypeDropdown: FC<{
  setSearch: (search: QueryString) => void
  search: QueryString
  types: TourType[]
  onChange: boolean
}> = ({ onChange, search, setSearch, types }) => {
  const pathname = usePathname()
  const [selected, setSelected] = useState<TourType[]>([])

  useEffect(() => {
    const query = qs.parseUrl(window.location.href, {
      arrayFormat: 'comma',
      decode: true,
    }).query

    if (typeof query.type == 'string') query.type = [query.type]
    if (query.type && query.type.length > 0) {
      const labelSet = new Set(query.type)
      const filteredObjects = types.filter((obj) => labelSet.has(obj.name!))
      setSelected(filteredObjects)
    }
  }, [])

  useEffect(() => {
    setSearch({
      ...search,
      type: selected.map((x) => x.name!),
    })
  }, [selected, pathname])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="text-left w-full  cursor-pointer">
          <Plus className="ml-2 h-4 w-4" />
          نوع الرحلة
          {selected.length > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden" onClick={() => setSelected([])}>
                {selected.length}
                <X className="border  rounded-lg w-4 h-4 mr-2 text-white bg-red-500/70" />
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selected.length > 1 ? (
                  <Badge variant="secondary" className="rounded-sm px-1 font-normal" onClick={() => setSelected([])}>
                    {selected.length}
                    <X className="border  rounded-lg w-4 h-4 mr-2 text-white bg-red-500/70" />
                  </Badge>
                ) : (
                  types
                    ?.filter((option) => selected.includes(option))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.name}
                        className="rounded-sm px-1 font-normal"
                        onClick={() => setSelected([...selected.filter((x) => x != option)])}
                      >
                        {option.name}
                        <X className="border  rounded-lg w-4 h-4 mr-2 text-white bg-red-500/70" />
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandList>
            <CommandEmpty>لاتوجد نتائج</CommandEmpty>
            <CommandGroup>
              {types?.map((option) => {
                return (
                  <CommandItem
                    key={option.name}
                    onSelect={() => {
                      if (selected.includes(option)) {
                        setSelected(selected.filter((x) => x != option))
                      } else {
                        setSelected([...selected, option])
                      }
                    }}
                  >
                    <Check
                      className={cn(
                        'ml-2 text-green-600 flex h-4 w-4 items-center justify-center opacity-0 transition-all duration-500',
                        selected.includes(option) ? 'opacity-100' : 'opacity-0',
                      )}
                    />

                    <span className="font-naskh">{option.name}</span>
                  </CommandItem>
                )
              })}
            </CommandGroup>
            {selected.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem className="justify-center text-center" onSelect={() => setSelected([])}>
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default TypeDropdown

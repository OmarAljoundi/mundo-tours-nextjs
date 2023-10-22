'use client'
import { useQuery } from 'react-query'
import { useEffect, useState, FC } from 'react'
import { QueryString, cn, daysFilter } from '@/lib/utils'
import qs from 'query-string'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CountryDropdown from './country-dropdown'
import DurationDropdown from './duration-dropdown'
import DestinationDropdown from './destination-dropdown'
import PriceDropdown from './price-dropdown'
import SearchFilterLoading from '../Loading/search-filter-loading'
import Tabs from '../TourListing/tabs'
import { usePathname, useRouter } from 'next/navigation'
import TypeDropdown from './type-dropdown'
import SortDropdown from './sort-dropdown'
import { Separator } from '../ui/separator'
import { getDestination, getTourTypes } from '@/lib/operations'

type FilterOptions = {
  onChange: boolean
  enableTabs?: boolean
}

const Filter: FC<FilterOptions> = ({ onChange, enableTabs = false }) => {
  const [search, setSearch] = useState<QueryString>({
    country: [],
    days: [],
    maxprice: null,
    location: null,
    tab: null,
    type: [],
  })

  const pathname = usePathname()
  const router = useRouter()
  const [mount, setMount] = useState(false)

  useEffect(() => {
    if (!mount) {
      const query = qs.parseUrl(window.location.href, {
        arrayFormat: 'comma',
        decode: true,
      }).query

      if (query.days && query.days.length > 0) {
        setSearch({
          ...search,
          days: query.days as string[],
        })
      }
      if (query.country && query.country.length > 0) {
        setSearch({
          ...search,
          country: query.country as string[],
        })
      }
      if (query.tab) {
        setSearch({
          ...search,
          tab: query.tab as string,
        })
      }
      if (query.type) {
        setSearch({
          ...search,
          type: query.type as string[],
        })
      }
      if (query.maxprice) {
        setSearch({
          ...search,
          maxprice: query.maxprice as string,
        })
      }
      if (query.sortMemebr && query.sortOrder) {
        setSearch({
          ...search,
          sortMemebr: query.sortMemebr as string,
          sortOrder: Number(query.sortOrder),
        })
      }

      setMount(true)
    }
  }, [mount])

  useEffect(() => {
    if (mount) {
      const query = {
        ...qs.parseUrl(window.location.href, {
          arrayFormat: 'comma',
          decode: true,
        }).query,
        days: search?.days,
        country: search?.country,
        tab: search?.tab,
        type: search?.type,
        maxprice: search?.maxprice,
        sortMemebr: search?.sortMemebr,
        sortOrder: search?.sortOrder,
      }

      const url = qs.stringifyUrl(
        {
          url: pathname,
          query,
        },
        {
          skipNull: true,
          skipEmptyString: true,
          arrayFormat: 'comma',
          encode: true,
        },
      )

      if (onChange) {
        router.push(url)
      }
    }
  }, [search, mount])

  const getUrl = () => {
    const url = qs.stringifyUrl(
      {
        url: '/tour-listing',
        query: search,
      },
      {
        skipNull: true,
        skipEmptyString: true,
        arrayFormat: 'comma',
        encode: true,
      },
    )

    return url
  }

  const { data: locations, isLoading } = useQuery('locations', async () => await getDestination(), {
    refetchOnWindowFocus: false,
    enabled: true,
    select: (data) => data.results?.filter((x) => x.is_office == false),
  })

  const { data: types, isLoading: isTypeLoading } = useQuery('types', async () => await getTourTypes(), {
    refetchOnWindowFocus: false,
    enabled: true,
  })

  if (isLoading || isTypeLoading) return <SearchFilterLoading />

  return (
    <div>
      <div className={cn('p-3 sm:p-4 lg:py-6 lg:px-8 bg-white  shadow-lg  grid gap-2  grid-cols-2', onChange ? 'lg:grid-cols-3' : 'lg:grid-cols-5')}>
        {enableTabs && <DestinationDropdown locations={locations ?? []} setSearch={setSearch} search={search} />}

        <CountryDropdown onChange={onChange} search={search} setSearch={setSearch} />
        <TypeDropdown types={types?.results ?? []} setSearch={setSearch} search={search} onChange={onChange} />

        <DurationDropdown onChange={onChange} search={search} setSearch={setSearch} />
        <PriceDropdown onChange={onChange} search={search} setSearch={setSearch} />
        {enableTabs && <SortDropdown onChange={onChange} search={search} setSearch={setSearch} />}

        {!onChange && (
          <section className={cn(onChange ? 'col-span-1' : 'col-span-2 lg:col-span-1')}>
            <Link href={getUrl()}>
              <Button className="w-full" size={'sm'}>
                <SearchIcon className="text-white" />
                <span className="mr-2 text-white text-lg">أبحث</span>
              </Button>
            </Link>
          </section>
        )}
      </div>

      {/* {enableTabs === true && (
        <>
          <Tabs onChange={onChange} search={search} setSearch={setSearch} />
        </>
      )} */}
    </div>
  )
}

export default Filter

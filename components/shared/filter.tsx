'use client'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState, FC, useCallback } from 'react'
import { QueryString, cn, queryString } from '@/lib/utils'
import qs from 'query-string'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CountryDropdown from './country-dropdown'
import DurationDropdown from './duration-dropdown'
import DestinationDropdown from './destination-dropdown'
import PriceDropdown from './price-dropdown'
import SearchFilterLoading from '../Loading/search-filter-loading'
import { usePathname, useRouter } from 'next/navigation'
import TypeDropdown from './type-dropdown'
import SortDropdown from './sort-dropdown'
import { getDestination, getTourTypes } from '@/lib/operations'
import { motion } from 'framer-motion'
import { CONTAINER_VAR, ITEMS_VAR } from '@/lib/animations'
import useTourTypes from '@/hooks/react-query/use-tour-types'
import useLocations from '@/hooks/react-query/use-locations'

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
  const { data: locations } = useLocations()
  const { data: types } = useTourTypes()
  const pathname = usePathname()
  const router = useRouter()
  const [mount, setMount] = useState(false)

  useEffect(() => {
    let localSearch = { ...queryString }
    if (!mount) {
      const query = qs.parseUrl(window.location.href, {
        arrayFormat: 'comma',
        decode: true,
      }).query

      if (query.days && query.days.length > 0) {
        localSearch = {
          ...localSearch,
          days: query.days as string[],
        }
      }

      if (query.country && query.country.length > 0) {
        localSearch = {
          ...localSearch,
          country: query.country as string[],
        }
      }

      if (query.tab) {
        localSearch = {
          ...localSearch,
          tab: query.tab as string,
        }
      }

      if (query.type) {
        localSearch = {
          ...localSearch,
          type: query.type as string[],
        }
      }

      if (query.maxprice) {
        localSearch = {
          ...localSearch,
          maxprice: query.maxprice as string,
        }
      }

      if (query.sortMemebr && query.sortOrder) {
        localSearch = {
          ...localSearch,
          sortMemebr: query.sortMemebr as string,
          sortOrder: Number(query.sortOrder),
        }
      }
      setSearch(localSearch)
      setMount(true)
    }
  }, [mount])

  const getSearch = useCallback(() => {
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
    return url
  }, [search])

  useEffect(() => {
    var url = getSearch()
    if (onChange) {
      router.push(url)
    }
  }, [getSearch])

  const getUrl = useCallback(() => {
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
  }, [search])

  return (
    <div>
      <motion.div
        variants={CONTAINER_VAR}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className={cn('p-3 sm:p-4 lg:py-6 lg:px-8 bg-white  shadow-lg  grid gap-2  grid-cols-2', onChange ? 'lg:grid-cols-3' : 'lg:grid-cols-5')}
      >
        {enableTabs && (
          <DestinationDropdown locations={locations?.results?.filter((x) => x.is_office == false) ?? []} setSearch={setSearch} search={search} />
        )}
        <motion.div variants={{ ...ITEMS_VAR }}>
          <CountryDropdown onChange={onChange} search={search} setSearch={setSearch} />
        </motion.div>

        <motion.div variants={{ ...ITEMS_VAR }}>
          <TypeDropdown types={types?.results ?? []} setSearch={setSearch} search={search} onChange={onChange} />
        </motion.div>
        <motion.div variants={{ ...ITEMS_VAR }}>
          <DurationDropdown onChange={onChange} search={search} setSearch={setSearch} />
        </motion.div>
        <motion.div variants={{ ...ITEMS_VAR }}>
          <PriceDropdown onChange={onChange} search={search} setSearch={setSearch} />
        </motion.div>
        {enableTabs && (
          <motion.div variants={{ ...ITEMS_VAR }}>
            <SortDropdown onChange={onChange} search={search} setSearch={setSearch} />{' '}
          </motion.div>
        )}

        {!onChange && (
          <motion.section variants={{ ...ITEMS_VAR }} className={cn(onChange ? 'col-span-1' : 'col-span-2 lg:col-span-1')}>
            <Link href={getUrl()}>
              <Button className="w-full" size={'sm'}>
                <SearchIcon className="text-white" />
                <span className="mr-2 text-white text-lg">أبحث</span>
              </Button>
            </Link>
          </motion.section>
        )}
      </motion.div>
    </div>
  )
}

export default Filter

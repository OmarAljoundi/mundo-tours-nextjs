'use client'
import { Tabs as TabUi, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useParams, useRouter } from 'next/navigation'
import { Separator } from '../ui/separator'
import useLocations from '@/hooks/react-query/use-locations'
import { useMemo } from 'react'

const Tabs = () => {
  const route = useRouter()
  const { destination, tab } = useParams()
  const { data: destinations, isLoading } = useLocations()

  const tabList = useMemo(() => {
    return destinations?.results?.find((x) => x.is_active && x.slug == decodeURIComponent(destination as string))?.location_attributes
  }, [destination, isLoading])

  if (tabList && tabList.length > 1) {
    return (
      <>
        <Separator className="my-2" />
        <h1 className="text-center text-7xl font-secondary text-secondary mb-5">أختار نوع البرناج</h1>

        <TabUi
          defaultValue={(tab as string)?.replaceAll('-', ' ')}
          className="w-full mb-8 "
          onValueChange={(e) => route.push(`/tour-listing/${decodeURIComponent(destination as string)}/${e.replaceAll(' ', '-')}`)}
        >
          <TabsList className="w-full shadow-xl bg-white gap-4 grid grid-cols-2 lg:grid-cols-4 h-full">
            {tabList
              ?.sort((a, b) => (a.order || 0) - (b.order || 0))
              .map((item) => (
                <TabsTrigger
                  value={item.title!.toString()}
                  key={item.id}
                  className="w-full data-[state=active]:border-none border data-[state=active]:bg-secondary data-[state=active]:text-white px-4 "
                >
                  {item.title}
                </TabsTrigger>
              ))}
          </TabsList>
        </TabUi>
      </>
    )
  }
  return null
}

export default Tabs

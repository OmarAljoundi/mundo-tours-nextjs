'use client'
import { Tabs as TabUi, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useRouter } from 'next/navigation'

import { Separator } from '../ui/separator'
import { LocationAttributes } from '@/types/custom'
const Tabs: React.FC<{
  currentTab: string
  tabList: LocationAttributes[]
}> = ({ currentTab, tabList }) => {
  const route = useRouter()
  return (
    <>
      <Separator className="my-2" />
      <h1 className="text-center text-7xl font-secondary text-secondary mb-5">أختار نوع البرناج</h1>

      <TabUi defaultValue={currentTab.replaceAll('-', ' ')} className="w-full mb-8 " onValueChange={(e) => route.push(e.replaceAll(' ', '-'))}>
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

export default Tabs

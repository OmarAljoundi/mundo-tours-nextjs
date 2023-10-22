'use client'
import CardAdd from '@/components/common/card-add'
import { useSetting } from '@/hooks/use-setting'
import { FunctionComponent } from 'react'
import CardDetails from './card-details'

interface CardListProps {}

const CardList: FunctionComponent<CardListProps> = () => {
  const config = useSetting()
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
      <CardAdd trigger="onOpenSlide" title="Click to create a new slide" />
      {config?.setting?.home?.sliders?.map((slide) => (
        <CardDetails {...slide} key={slide.uuid} />
      ))}
    </div>
  )
}

export default CardList

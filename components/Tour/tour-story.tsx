'use client'
import { FC } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Tour } from '@/types/custom'
const TourStory: FC<{ tour: Tour }> = ({ tour }) => {
  return (
    <div className="p-3 sm:p-4 lg:p-6 bg-[var(--bg-1)] rounded-2xl border border-neutral-40 mb-6 lg:mb-10">
      <h4 className="mb-0 text-2xl font-semibold font-primary">قصة الرحلة</h4>
      <div className="border border-dashed my-5"></div>
      <ul className="flex flex-col gap-6">
        {tour?.tour_sections?.map(({ description, title, uuid }, index) => (
          <li
            key={uuid}
            className="relative md:before:absolute before:top-[72px] before:bottom-[-14px] before:right-[32px] before:w-[1px] md:before:border-l before:border-dashed before:border-[var(--primary)]"
          >
            <div className="flex flex-col md:flex-row gap-6 md:gap-10">
              <div className="grid place-content-center ml-3 md:ml-0 relative w-16 h-16 rounded-full bg-secondary after:scale-[1.18] text-white shrink-0 after:w-full after:h-full after:absolute after:border-dashed after:border after:border-[var(--primary)] after:rounded-full">
                <div className="text-center">
                  <p className="text-lg mb-0"> اليوم </p>
                  <h2 className="mb-0 text-white">
                    {' '}
                    {index + 1 < 10 ? '0' : ''}
                    {index + 1}{' '}
                  </h2>
                </div>
              </div>
              <div className="flex-grow rounded-2xl bg-white shadow-lg p-3 sm:p-4 lg:p-6">
                <Accordion type="single" collapsible defaultValue="item-1">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="font-primary text-lg text-primary/80">{title}</AccordionTrigger>
                    <AccordionContent className="font-primary text-base">{description}</AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TourStory

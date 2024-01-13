'use client'
import { Office, SocialMedia } from '@/types/custom'
import { FormikProps, useFormik } from 'formik'
import { Button as ShcdnButton } from '@/components/ui/button'
import { Plus, SearchIcon, Trash, X } from 'lucide-react'
import { Button, Checkbox, CheckboxGroup, Chip, Input, ModalFooter, SelectItem, Tab, Tabs, Textarea, Tooltip, User } from '@nextui-org/react'

import { Modal } from '../shared/modal'
import { useModal } from '@/hooks/use-modal'
import { toast } from 'sonner'
import { createOffice, getTours, updateOffice } from '@/lib/operations'
import { http } from '@/service/httpService'
import { REVALIDATE_OFFICE_LIST, REVALIDATE_TOUR_LIST } from '@/lib/keys'
import { useRouter } from 'next/navigation'
import CustomSelect from '../next-ui/custom-select'
import { useState } from 'react'
import { v4 } from 'uuid'
import { Separator } from '../ui/separator'
import { ScrollArea } from '../ui/scroll-area'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { FunctionComponent } from 'react'
import SingleImageForm from '../shared/single-image-form'
import useTours from '@/hooks/react-query/use-tours'

interface BestToursFormProps {
  formik: FormikProps<Office>
}

const BestToursForm: FunctionComponent<BestToursFormProps> = ({ formik }) => {
  const [query, setQuery] = useState<string>()
  const [open, setOpen] = useState(false)
  const [groupSelected, setGroupSelected] = useState<string[]>([])
  const { values, dirty, touched, errors, handleBlur, handleChange, handleReset, handleSubmit, resetForm, setFieldValue, setValues } = formik
  const getNoneSelectedTours = () => tours?.filter((x) => !values.best_tours?.includes(x.id!) && x.name?.includes(query ?? ''))

  const handleDeleteTour = (id: number) => {
    setValues({
      ...values,
      best_tours: [...(values.best_tours?.filter((x) => x !== id) ?? [])],
    })
  }

  const handleAddTour = () => {
    setValues({
      ...values,
      best_tours: [...(values.best_tours ?? []), ...groupSelected.map((x) => Number(x))],
    })
  }
  const { data: tours } = useTours()

  return (
    <div className="w-full border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100 col-span-7">
      <div className="grid grid-cols-10  divide-x-2">
        <div className="px-4 col-span-6 lg:col-span-5">
          <div className="flex gap-x-2">
            <Input
              placeholder={'Search hotel name'}
              value={query}
              size="sm"
              onChange={(event) => setQuery(event.target.value)}
              startContent={<SearchIcon className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />}
            />
            <Tooltip content="Click to add after selecting the hotels" isOpen={open} onOpenChange={(open) => setOpen(open)} showArrow={true}>
              <Button size="sm" isIconOnly variant="flat" onPress={() => handleAddTour()}>
                <Plus />
              </Button>
            </Tooltip>
          </div>

          <Separator className="my-2" />
          <ScrollArea className="flex flex-col gap-1 w-full h-96 max-h-96">
            <CheckboxGroup
              value={groupSelected}
              onChange={(e) => setGroupSelected(e as string[])}
              classNames={{
                base: 'w-full',
              }}
            >
              {getNoneSelectedTours()?.map((tour) => (
                <Checkbox
                  key={tour.id!}
                  classNames={{
                    base: cn(
                      'inline-flex  max-w-full bg-content1 m-0',
                      'hover:bg-content2 items-center justify-start',
                      'cursor-pointer rounded-lg  border-2 border-transparent',
                      'data-[selected=true]:border-primary',
                    ),
                    label: 'w-full',
                  }}
                  value={tour.id?.toString()}
                >
                  <div className="w-full flex justify-between gap-2">
                    <User
                      avatarProps={{
                        size: 'sm',
                        src: tour.images && tour.images.length > 0 ? tour.images[0] : '',
                      }}
                      name={tour.name}
                    />
                  </div>
                </Checkbox>
              ))}
            </CheckboxGroup>
          </ScrollArea>
        </div>
        <div className="flex flex-wrap gap-2 justify-center lg:justify-start lg:px-2 content-start  col-span-4 lg:col-span-5">
          {tours
            ?.filter((t) => values.best_tours?.includes(t.id!))
            ?.map((tour, tour_index) => (
              <Chip key={tour_index} onClose={() => handleDeleteTour(tour.id!)} variant="flat" className="py-6 px-2">
                <div className="w-full flex justify-between gap-2">
                  <User
                    avatarProps={{
                      size: 'sm',
                      src: tour.images && tour.images.length > 0 ? tour.images[0] : '',
                    }}
                    name={
                      <div className="w-16 text-ellipsis overflow-hidden">
                        <span className="">{tour.name}</span>
                      </div>
                    }
                  />
                </div>
              </Chip>
            ))}
        </div>
      </div>
    </div>
  )
}

export default BestToursForm

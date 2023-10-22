'use client'
import { BestTours, Office } from '@/types/custom'
import { FormikProps, useFormik } from 'formik'
import { Plus, Save, SearchIcon } from 'lucide-react'
import { Button, Checkbox, CheckboxGroup, Chip, Input, Tooltip, User } from '@nextui-org/react'

import { getTours } from '@/lib/operations'
import { REVALIDATE_TOUR_LIST } from '@/lib/keys'
import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'
import { useQuery } from 'react-query'
import { FunctionComponent } from 'react'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useSetting } from '@/hooks/use-setting'
import { PushJsonFile } from '@/lib/storage-operations'
import { toast } from 'sonner'
import ToursSeoForm from '@/app/admin/dashboard/setting/best-tours/tours-seo-form'
import SeoForm from '@/components/shared/seo-form'

interface BestToursFormProps {}

const BestToursForm: FunctionComponent<BestToursFormProps> = () => {
  const [query, setQuery] = useState<string>()
  const config = useSetting()
  const [loading, setLoading] = useState(false)
  const [groupSelected, setGroupSelected] = useState<string[]>([])
  const getNoneSelectedTours = () => tours?.filter((x) => !groupSelected.includes(String(x.id!)) && x.name?.includes(query ?? ''))

  const handleDeleteTour = (id: number) => {
    setGroupSelected([...groupSelected.filter((x) => x !== String(id))])
  }

  console.log('config.setting?', config.setting)
  useEffect(() => {
    setGroupSelected(config.setting?.best_tours?.tours?.map((x) => x.toString()) ?? [])
  }, [config.setting?.best_tours])

  const SaveChanges = (formData: BestTours) => {
    setLoading(true)
    let newObject = { ...config.setting }
    newObject = {
      ...newObject,
      best_tours: {
        seo: formData.seo,
        tours: groupSelected.map((x) => Number(x)),
      },
    }

    config.onCreate(newObject)
    const jsonData = JSON.stringify(newObject)
    const blob = new Blob([jsonData], { type: 'application/json' })
    toast.promise(PushJsonFile(blob), {
      loading: 'Saving your changes..',
      error(error) {
        return error
      },
      success() {
        return 'Saved successfully'
      },
      finally() {
        setLoading(false)
      },
    })
  }

  const formik = useFormik({
    initialValues: config?.setting?.best_tours ?? { seo: { description: '', tags: '', title: '' } },
    onSubmit: SaveChanges,
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: true,
  })

  const { data: tours } = useQuery([REVALIDATE_TOUR_LIST], async () => await getTours(), { cacheTime: 10000, refetchInterval: false })

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-2 flex justify-end">
        <Button color="primary" endContent={<Save />} type="submit" isLoading={loading}>
          Save Changes
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-x-4">
        <div className="w-full border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100 flex">
          <div className="grid grid-cols-10  divide-x-2">
            <div className="px-4 col-span-6 lg:col-span-5">
              <Input
                placeholder={'Search hotel name'}
                value={query}
                size="sm"
                onChange={(event) => setQuery(event.target.value)}
                startContent={<SearchIcon className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />}
              />

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
                ?.filter((t) => groupSelected?.includes(String(t.id!)))
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
        <div className="border-small  rounded-small border-default-200 dark:border-default-100 p-8">
          <SeoForm formik={formik} />
        </div>
      </div>
    </form>
  )
}

export default BestToursForm

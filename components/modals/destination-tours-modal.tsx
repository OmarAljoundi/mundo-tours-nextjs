'use client'
import { LocationAttributes, Tour } from '@/types/custom'
import { useFormik } from 'formik'
import { Button, Checkbox, CheckboxGroup, Chip, Input, ModalFooter, SelectItem, Tab, Tabs, Textarea, Tooltip, User } from '@nextui-org/react'
import CustomSelect from '@/components/next-ui/custom-select'
import { Modal } from '../shared/modal'
import { useModal } from '@/hooks/use-modal'
import { useRouter } from 'next/navigation'
import { Plus, SearchIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { cn } from '@/lib/utils'
import { Separator } from '../ui/separator'
import { createDestinationAttr, deleteLocationAttr, getTours } from '@/lib/operations'
import { toast } from 'sonner'
import { ScrollArea } from '../ui/scroll-area'
import { http } from '@/service/httpService'
import { REVALIDATE_LOCATION_LIST, REVALIDATE_TOUR_LIST } from '@/lib/keys'
import useTours from '@/hooks/react-query/use-tours'

const DestinationToursModal = () => {
  const [selected, setSelectedKey] = useState<string>('')
  const [groupSelected, setGroupSelected] = React.useState<string[]>([])
  const [query, setQuery] = useState<string>('')
  const [open, setOpen] = useState(false)
  const modal = useModal()
  const router = useRouter()

  const { data: tours, isLoading } = useTours()

  const { onClose, isOpenDestinationTours, data } = modal

  const handleSubmitForm = async (formData: LocationAttributes[]) => {
    await deleteLocationAttr(modal?.data?.id)
    const promises = formData.map((element) => {
      return createDestinationAttr(element)
    })

    toast.promise(Promise.all(promises), {
      loading: `Loading destination tours...`,
      async success(data) {
        await http(`/api/revalidate?tag=${REVALIDATE_LOCATION_LIST}`).get()
        router.refresh()
        onClose()
        return `Destination tours has been saved successfully`
      },
      error(error) {
        return `Error whlie saving destination tours : ` + error
      },
    })
  }

  const formik = useFormik<LocationAttributes[]>({
    initialValues: data?.location_attributes ?? [],
    enableReinitialize: true,
    onSubmit: handleSubmitForm,
    validateOnBlur: true,
    validateOnChange: true,
  })

  const createEmptyTab = () => {
    formik.setValues([
      ...values,
      {
        title: `Untitled ${values.length + 1}`,
        location_id: modal?.data?.id,
        location_tours: [],
      },
    ])
  }
  const handleAddTours = (index: number) => {
    formik.setValues((prevValues) => {
      const updatedValues = structuredClone(prevValues)
      updatedValues[index].location_tours = [
        ...(updatedValues[index].location_tours ?? []),
        ...groupSelected.map((g) => {
          return {
            tour_id: Number(g),
            location_id: updatedValues[index].location_id!,
            location_attr_id: updatedValues[index].id!,
          }
        }),
      ]
      return updatedValues
    })
    setGroupSelected([])
  }
  const handleDeleteTour = (tour: Tour, index: number) => {
    formik.setValues((prevValues) => {
      const updatedValues = structuredClone(prevValues)
      updatedValues[index].location_tours = updatedValues[index].location_tours?.filter((x) => x.tour_id !== tour.id!)
      return updatedValues
    })
  }
  const handleDeleteTab = (_index: number) => {
    setSelectedKey((values.length - 1).toString())
    formik.setValues([...values.filter((attr, index) => index !== _index)])
  }

  useEffect(() => {
    if (isOpenDestinationTours == false) {
      formik?.resetForm()
    }

    if (groupSelected.length > 0) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }, [isOpenDestinationTours, groupSelected])

  if (isLoading) return null

  const { values, dirty, touched, errors, handleBlur, handleChange, handleReset, handleSubmit, resetForm, setFieldValue, setValues } = formik

  const getNoneSelectedTours = () => {
    const selectedTourIdsAttr: number[] = values[Number(selected)]?.location_tours?.map((x) => x.tour_id!) ?? []
    return tours?.filter((x) => !selectedTourIdsAttr.includes(x.id!) && x.name?.includes(query))
  }

  return (
    <Modal
      isDismissable={false}
      size="5xl"
      isOpen={isOpenDestinationTours}
      onClose={onClose}
      dialogClass="px-2"
      title="Connect your destination with related tours"
      renderFooter={() => {
        return (
          <ModalFooter>
            <Button variant="bordered" color="primary" type="button" onClick={() => handleSubmit()}>
              Submit
            </Button>
          </ModalFooter>
        )
      }}
    >
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-x-4">
        <Tooltip content="Click to add new section" placement="right-start" shouldFlip isOpen={values.length == 0}>
          <Button onPress={() => createEmptyTab()} variant="ghost" isIconOnly>
            <Plus />
          </Button>
        </Tooltip>
        <Tabs selectedKey={selected} onSelectionChange={(e) => setSelectedKey(e.toString())}>
          {values?.map((item, index) => (
            <Tab
              className="w-full"
              key={index.toString()}
              title={
                <Chip variant="light" isCloseable radius="md" onClose={() => handleDeleteTab(index)}>
                  {!!item.title ? item.title : 'Untitled'}
                </Chip>
              }
              as={'div'}
            >
              <div className="grid gap-4 ">
                <div className="flex gap-x-4">
                  <Input
                    label="Title"
                    labelPlacement="outside"
                    placeholder="Enter title"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onClear={() => setFieldValue('name', '')}
                    value={item.title || ''}
                    name={`${[index]}.title`}
                    isClearable
                    description={`Length preferably must not be greater than  (${item.title?.length ?? 0} / 20) `}
                  />

                  <CustomSelect
                    selectionMode="single"
                    placeholder="Select order"
                    label="Order"
                    labelPlacement="outside"
                    name={`${[index]}.order`}
                    onChange={handleChange}
                    value={item.order || ''}
                  >
                    {['1', '2', '3', '4', '5', '6'].slice(0, values.length).map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </CustomSelect>
                </div>
                <div className="grid grid-cols-10 gap-5 items-start">
                  <div className="w-full border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100 col-span-7">
                    <div className="grid grid-cols-10  divide-x-2">
                      <div className="px-4 col-span-6 lg:col-span-5">
                        <div className="flex gap-x-2">
                          <Input
                            placeholder={'Search tour name'}
                            value={query}
                            size="sm"
                            onChange={(event) => setQuery(event.target.value)}
                            startContent={
                              <SearchIcon className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                            }
                          />
                          <Tooltip
                            content="Click to add after selecting the tours"
                            isOpen={open}
                            onOpenChange={(open) => setOpen(open)}
                            showArrow={true}
                          >
                            <Button size="sm" isIconOnly variant="flat" onPress={() => handleAddTours(index)}>
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
                                    description={<span>{tour.tour_type?.name}</span>}
                                    name={tour.name}
                                  />
                                </div>
                              </Checkbox>
                            ))}
                          </CheckboxGroup>
                        </ScrollArea>
                      </div>
                      <div className="flex flex-wrap gap-2 justify-center content-start  col-span-4 lg:col-span-5">
                        {tours
                          ?.filter((t) => values[index]?.location_tours?.map((x) => x.tour_id!).includes(t.id!))
                          ?.map((tour, tour_index) => (
                            <Chip key={tour_index} onClose={() => handleDeleteTour(tour, index)} variant="flat" className="py-6 px-2">
                              <div className="w-full flex justify-between gap-2">
                                <User
                                  avatarProps={{
                                    size: 'sm',
                                    src: tour.images && tour.images.length > 0 ? tour.images[0] : '',
                                  }}
                                  description={<span>{tour.tour_type?.name}</span>}
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
                  <div className="col-span-3 grid gap-y-5">
                    <Input
                      label="Seo Title"
                      labelPlacement="outside"
                      placeholder="Enter seo title"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={item.seo?.title || ''}
                      name={`${[index]}.seo.title`}
                    />
                    <Input
                      label="Seo Tags"
                      labelPlacement="outside"
                      placeholder="Enter seo tags"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={item.seo?.tags || ''}
                      name={`${[index]}.seo.tags`}
                    />
                    <Textarea
                      label="Seo Description"
                      labelPlacement="outside"
                      placeholder="Enter seo description name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={item.seo?.description || ''}
                      name={`${[index]}.seo.description`}
                      description={`Seo description should not be higher than 150 character (${item.seo?.description?.length ?? 0} / 150)`}
                    />
                  </div>
                </div>
              </div>
            </Tab>
          ))}
        </Tabs>
      </form>
    </Modal>
  )
}

export default DestinationToursModal

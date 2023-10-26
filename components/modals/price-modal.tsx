'use client'

import { Button, Checkbox, Input, ModalFooter, Popover, PopoverContent, PopoverTrigger, Switch, Textarea } from '@nextui-org/react'
import { Modal } from '../shared/modal'
import { v4 as uuidv4 } from 'uuid'
import { TourPrice } from '@/types/custom'
import { useFormik } from 'formik'
import { CalendarIcon, X } from 'lucide-react'
import { useState } from 'react'
import { usePriceModal } from '@/hooks/use-price-modal'
import { cn } from '@/lib/utils'
import { format, set } from 'date-fns'
import { Calendar } from '../ui/calendar'
import { TourPriceMultiple, TourPriceSingle } from '@/types/validations'

export const PriceModal = () => {
  const PriceModal = usePriceModal()
  const [uniqueId, setUniqueId] = useState(uuidv4())
  const handleSubmitSection = (formData: TourPrice) => {
    const { formik, onClose } = PriceModal
    const TourPrices = formik!.values.tour_prices || []
    const oldSectionIndex = TourPrices.findIndex((x) => x.uuid === formData.uuid)

    if (oldSectionIndex !== -1) {
      const updatedSections = [...TourPrices]
      updatedSections[oldSectionIndex] = formData

      formik!.setValues({
        ...formik!.values,
        tour_prices: updatedSections,
      })
    } else {
      formik!.setValues({
        ...formik!.values,
        tour_prices: [...TourPrices, formData],
      })
    }

    setUniqueId(uuidv4())
    resetForm()
    onClose()
  }

  const sectionFormik = useFormik({
    initialValues: {
      uuid: uniqueId,
      balcony_price: undefined,
      date: undefined,
      internal_price: undefined,
      one_price: undefined,
      price: undefined,
      sea_view_price: undefined,
      include_all_month: false,
      ...PriceModal.data,
    },
    onSubmit: handleSubmitSection,
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: PriceModal.data?.one_price ? TourPriceSingle : TourPriceMultiple,
  })

  const { handleChange, handleBlur, values, touched, errors, resetForm, handleSubmit, setFieldValue, setSubmitting } = sectionFormik

  if (PriceModal.formik == null) {
    return null
  }

  console.log('errors', errors)

  return (
    <Modal
      isOpen={PriceModal.isOpen}
      onClose={PriceModal.onClose}
      isDismissable={false}
      dialogClass="px-2"
      title="Price Modal"
      renderFooter={() => {
        return (
          <ModalFooter>
            <Button variant="bordered" color="primary" type="button" onClick={() => handleSubmit()}>
              Save
            </Button>
          </ModalFooter>
        )
      }}
    >
      <form className="grid space-y-4 mt-4 gap-x-4">
        <div className="space-y-4 mb-4">
          {values.one_price == false ? (
            <div className="grid gap-y-4">
              <Input
                label="Balcony Price"
                labelPlacement="outside"
                placeholder="Enter balcony Price"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.balcony_price?.toString() || ''}
                onClear={() => setFieldValue('balcony_price', undefined)}
                name="balcony_price"
                type="number"
                isClearable
                isInvalid={touched.balcony_price && !!errors.balcony_price}
                startContent={
                  <div className="pointer-events-none flex items-center border-r pr-2">
                    <span className="text-default-400 text-small">OMR</span>
                  </div>
                }
              />
              <Input
                label="Sea view price"
                labelPlacement="outside"
                placeholder="Enter sea view price"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.sea_view_price?.toString() || ''}
                onClear={() => setFieldValue('sea_view_price', undefined)}
                name="sea_view_price"
                type="number"
                isClearable
                isInvalid={touched.sea_view_price && !!errors.sea_view_price}
                startContent={
                  <div className="pointer-events-none flex items-center border-r pr-2">
                    <span className="text-default-400 text-small">OMR</span>
                  </div>
                }
              />
              <Input
                label="Internal room price"
                labelPlacement="outside"
                placeholder="Enter internal room price"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.internal_price?.toString() || ''}
                onClear={() => setFieldValue('internal_price', undefined)}
                name="internal_price"
                type="number"
                isClearable
                isInvalid={touched.internal_price && !!errors.internal_price}
                startContent={
                  <div className="pointer-events-none flex items-center border-r pr-2">
                    <span className="text-default-400 text-small">OMR</span>
                  </div>
                }
              />
              <Popover>
                <PopoverTrigger>
                  <Input
                    classNames={{
                      input: 'text-left ml-2',
                    }}
                    label="Travel Date"
                    isInvalid={touched.date && !!errors.date}
                    errorMessage={touched.date && !!errors.date && errors.date}
                    labelPlacement="outside"
                    placeholder="Enter Travel Date"
                    value={values.date ? format(new Date(values.date)!, 'PPP') : 'Travel Date'}
                    startContent={<CalendarIcon className="h-4 w-4" />}
                  />
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={values.date ?? undefined} onSelect={(e) => setFieldValue('date', e)} initialFocus />
                </PopoverContent>
              </Popover>
              <Checkbox
                classNames={{
                  base: cn(
                    'inline-flex w-full bg-content1',
                    ' bg-content2 items-center justify-start',
                    'cursor-pointer rounded-lg gap-2  border-2 border-transparent',
                    'data-[selected=true]:border-primary m-0 max-w-full',
                  ),
                  label: 'w-full  max-w-full',
                }}
                isSelected={values.include_all_month ?? false}
                onValueChange={(e) => setFieldValue('include_all_month', e)}
              >
                <div className="w-full flex justify-between gap-2">
                  <h1>Include All month</h1>
                </div>
              </Checkbox>
            </div>
          ) : (
            <div className="grid gap-y-4">
              <Input
                label="Price"
                labelPlacement="outside"
                placeholder="Enter price"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.price?.toString() || ''}
                onClear={() => setFieldValue('price', undefined)}
                name="price"
                type="number"
                isClearable
                isInvalid={touched.price && !!errors.price}
                errorMessage={touched.price && !!errors.price && errors.price}
                startContent={
                  <div className="pointer-events-none flex items-center border-r pr-2">
                    <span className="text-default-400 text-small">OMR</span>
                  </div>
                }
              />
              <Popover>
                <PopoverTrigger>
                  <Input
                    classNames={{
                      input: 'text-left ml-2',
                    }}
                    label="Travel Date"
                    isInvalid={touched.date && !!errors.date}
                    errorMessage={touched.date && !!errors.date && errors.date}
                    labelPlacement="outside"
                    placeholder="Enter Travel Date"
                    value={values.date ? format(new Date(values.date)!, 'PPP') : 'Travel Date'}
                    startContent={<CalendarIcon className="h-4 w-4" />}
                  />
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={values.date ?? undefined} onSelect={(e) => setFieldValue('date', e)} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>
      </form>
    </Modal>
  )
}

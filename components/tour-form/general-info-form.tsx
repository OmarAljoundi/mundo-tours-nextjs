'use client'
import { Tour } from '@/types/custom'
import { Chip, Input, Select, SelectItem, SelectedItems } from '@nextui-org/react'
import { FormikProps } from 'formik'
import { FunctionComponent } from 'react'
import { COUNTRIES, DAYS } from '@/lib/constants'
import PriceInfo from './price-info-form'
import SettingInfo from './setting-info-form'
import ImageForm from './image-form'
import ExternalInfoForm from './external-info-form'

interface GenralInfoFormProps {
  formik: FormikProps<Tour>
}

const GenralInfoForm: FunctionComponent<GenralInfoFormProps> = ({ formik }) => {
  const { dirty, errors, values, handleBlur, handleChange, touched, setFieldValue } = formik

  return (
    <div className="grid grid-cols-6 space-y-4 mt-4 gap-x-4">
      <div className="col-span-3 xl:col-span-4 space-y-4">
        <div className="grid grid-cols-2 gap-x-4 gap-y-6">
          <div className="col-span-2 lg:col-span-1">
            <Input
              label="Tour name"
              labelPlacement="outside"
              placeholder="Enter tour name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name || ''}
              name="name"
              isClearable
              isInvalid={touched.name && !!errors.name}
            />
          </div>
          <div className="col-span-2 lg:col-span-1">
            <Input
              label="Tour code"
              labelPlacement="outside"
              placeholder="Enter tour name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.code || ''}
              name="code"
              isClearable
              isInvalid={touched.code && !!errors.code}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-6">
          <div className="col-span-2 lg:col-span-1">
            <Select
              selectionMode="multiple"
              placeholder="Select countries"
              label="Countries"
              labelPlacement="outside"
              selectedKeys={values.tour_countries ?? []}
              isInvalid={touched.tour_countries && !!errors.tour_countries}
              errorMessage={touched.tour_countries && errors.tour_countries}
              onSelectionChange={(selection) => setFieldValue('tour_countries', Array.from(selection))}
              isMultiline={true}
              classNames={{
                trigger: 'min-h-unit-12 py-2',
              }}
              renderValue={(items: SelectedItems<any>) => {
                return (
                  <div className="flex flex-wrap gap-1 line-clamp-1 overflow-hidden text-ellipsis max-w-full">
                    {items.map((item: any) => (
                      <Chip
                        isCloseable
                        onClose={() =>
                          setFieldValue(
                            'tour_countries',
                            values.tour_countries?.filter((x) => x != item.key),
                          )
                        }
                        key={item.key}
                      >
                        {item.key}
                      </Chip>
                    ))}
                  </div>
                )
              }}
            >
              {COUNTRIES.map((country) => (
                <SelectItem key={country.label} value={country.label}>
                  {country.label}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="col-span-2 lg:col-span-1">
            <Select
              selectionMode="multiple"
              placeholder="Select days"
              label="Days"
              labelPlacement="outside"
              isMultiline-
              classNames={{
                trigger: 'min-h-unit-12 py-2',
              }}
              selectedKeys={values.start_day ?? []}
              onSelectionChange={(selection) => setFieldValue('start_day', Array.from(selection))}
              onBlur={handleBlur}
              name="start_day"
              isInvalid={touched.start_day && !!errors.start_day}
              errorMessage={touched.start_day && errors.start_day}
              renderValue={(items: SelectedItems<any>) => {
                return (
                  <div className="flex flex-wrap gap-1">
                    {items.map((item: any) => (
                      <Chip
                        isCloseable
                        onClose={() =>
                          setFieldValue(
                            'start_day',
                            values.start_day?.filter((x) => x != item.key),
                          )
                        }
                        key={item.key}
                      >
                        {item.key}
                      </Chip>
                    ))}
                  </div>
                )
              }}
            >
              {DAYS.map((day) => (
                <SelectItem key={day} value={day}>
                  {day}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
        <PriceInfo formik={formik} />
        <SettingInfo formik={formik} />
        <ExternalInfoForm formik={formik} />
      </div>
      <ImageForm formik={formik} />
    </div>
  )
}

export default GenralInfoForm

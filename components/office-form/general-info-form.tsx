'use client'
import { Office } from '@/types/custom'
import { FormikProps } from 'formik'
import { Button as ShcdnButton } from '@/components/ui/button'
import { X } from 'lucide-react'
import { Input, SelectItem } from '@nextui-org/react'
import CustomSelect from '../next-ui/custom-select'
import { FunctionComponent } from 'react'
import SingleImageForm from '../shared/single-image-form'

interface GeneralInfoProps {
  formik: FormikProps<Office>
}

const GeneralInfo: FunctionComponent<GeneralInfoProps> = ({ formik }) => {
  const { values, touched, errors, handleBlur, handleChange, setFieldValue } = formik

  return (
    <div className="grid gap-4">
      <SingleImageForm field="logo" maxNumber={1} formik={formik}>
        {values.logo && (
          <div className="grid grid-cols-2 border p-4 mt-5">
            <div className="image-item border rounded-xl relative dark:bg-white w-44 ">
              <img src={values.logo} alt="" className="w-full rounded-xl h-full" />
              <ShcdnButton
                type="button"
                size={'icon'}
                variant={'ghost'}
                className="absolute -top-2 -right-2 bg-white w-6 h-6 rounded-full border border-red-600"
                onClick={() => {
                  setFieldValue('logo', undefined)
                }}
              >
                <X className="w-4 h-4 text-red-600" />
              </ShcdnButton>
            </div>
          </div>
        )}
      </SingleImageForm>
      <div className="grid grid-cols-2 gap-x-8 gap-y-4">
        <Input
          label="Primary Color"
          labelPlacement="outside"
          placeholder="Enter primary color"
          onChange={handleChange}
          onBlur={handleBlur}
          onClear={() => setFieldValue('primary_color', '')}
          value={values.primary_color || ''}
          name="primary_color"
          isClearable
          isInvalid={touched.primary_color && !!errors.primary_color}
        />
        <Input
          label="Secondary Color"
          labelPlacement="outside"
          placeholder="Enter secondary color"
          onChange={handleChange}
          onBlur={handleBlur}
          onClear={() => setFieldValue('secondary_color', '')}
          value={values.secondary_color || ''}
          name="secondary_color"
          isClearable
          isInvalid={touched.secondary_color && !!errors.secondary_color}
        />
        <Input
          label="Bg Primary Color"
          labelPlacement="outside"
          placeholder="Enter bg primary color"
          onChange={handleChange}
          onBlur={handleBlur}
          onClear={() => setFieldValue('bg_primary_color', '')}
          value={values.bg_primary_color || ''}
          name="bg_primary_color"
          isClearable
          isInvalid={touched.bg_primary_color && !!errors.bg_primary_color}
        />
        <Input
          label="Bg Secondary Color"
          labelPlacement="outside"
          placeholder="Enter bg secondary color"
          onChange={handleChange}
          onBlur={handleBlur}
          onClear={() => setFieldValue('bg_secondary_color', '')}
          value={values.bg_secondary_color || ''}
          name="bg_secondary_color"
          isClearable
          isInvalid={touched.bg_secondary_color && !!errors.bg_secondary_color}
        />
        <Input
          label="Slug"
          labelPlacement="outside"
          placeholder="Enter slug name"
          onChange={handleChange}
          onBlur={handleBlur}
          onClear={() => setFieldValue('slug', '')}
          value={values.slug || ''}
          name="slug"
          isClearable
          isInvalid={touched.slug && !!errors.slug}
          description="Slug must not contains any special char or spaces, use - or _ for spaces"
        />

        <CustomSelect
          selectionMode="single"
          placeholder="Select a font"
          label="Font"
          labelPlacement="outside"
          name="primary_font"
          onChange={handleChange}
          value={values.primary_font || ''}
        >
          {['font-kufi', 'font-naskh', 'font-sans'].map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </CustomSelect>

        <CustomSelect
          selectionMode="single"
          placeholder="Select a currency"
          label="Currency"
          labelPlacement="outside"
          name="currency"
          onChange={handleChange}
          value={values.currency || ''}
        >
          {['SAR', 'OMR'].map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </CustomSelect>
      </div>
    </div>
  )
}

export default GeneralInfo

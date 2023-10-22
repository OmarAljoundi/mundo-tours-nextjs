import { Tour } from '@/types/custom'
import { FormikProps } from 'formik'
import { FunctionComponent } from 'react'
import CustomSelect from '../next-ui/custom-select'
import { useStatic } from '@/hooks/use-static'
import { Checkbox, Input, SelectItem } from '@nextui-org/react'
import { cn } from '@/lib/utils'

interface SettingInfoProps {
  formik: FormikProps<Tour>
}

const SettingInfo: FunctionComponent<SettingInfoProps> = ({ formik }) => {
  const staticData = useStatic()

  const { dirty, errors, values, handleBlur, handleChange, isValid, touched, setFieldValue, handleReset } = formik
  return (
    <div className="grid grid-cols-4 gap-x-4 gap-y-6 items-end">
      <div className="col-span-2 xl:col-span-1">
        <CustomSelect
          selectionMode="single"
          placeholder="Select a type"
          label="Tour Type"
          labelPlacement="outside"
          name="type_id"
          onChange={handleChange}
          value={values.type_id?.toString()}
          isInvalid={touched.type_id && !!errors.type_id}
          errorMessage={errors.type_id && errors.type_id}
        >
          {staticData.types.map((item) => (
            <SelectItem key={item.id!.toString()} value={item.id?.toString()}>
              {item.name}
            </SelectItem>
          ))}
        </CustomSelect>
      </div>
      <div className="col-span-2 xl:col-span-1">
        <Input
          label="# of days"
          labelPlacement="outside"
          placeholder="Number of days"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.number_of_days?.toString() || ''}
          onClear={() => setFieldValue('number_of_days', undefined)}
          name="number_of_days"
          type="number"
          isClearable
          isInvalid={touched.number_of_days && !!errors.number_of_days}
        />
      </div>
      <div className="col-span-2 xl:col-span-1">
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
          isSelected={values.is_ticket_included ?? false}
          onValueChange={(e) => setFieldValue('is_ticket_included', e)}
        >
          <div className="w-full flex justify-between gap-2">
            <h1>Ticket Included</h1>
          </div>
        </Checkbox>
      </div>
      <div className="col-span-2 xl:col-span-1">
        <Checkbox
          classNames={{
            base: cn(
              'inline-flex w-full  bg-content1',
              ' items-center justify-start',
              'cursor-pointer rounded-lg gap-2  border-2 border-transparent bg-content2',
              'data-[selected=true]:border-primary m-0 max-w-full',
            ),
            label: 'w-full  max-w-full',
          }}
          isSelected={values.is_active ?? false}
          onValueChange={(e) => setFieldValue('is_active', e)}
        >
          <div className="w-full flex justify-between gap-2">
            <h1>Published</h1>
          </div>
        </Checkbox>
      </div>
    </div>
  )
}

export default SettingInfo

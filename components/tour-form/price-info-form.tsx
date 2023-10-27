import { Tour } from '@/types/custom'
import { Input } from '@nextui-org/react'
import { FormikProps } from 'formik'
import { FunctionComponent } from 'react'

interface PriceInfoProps {
  formik: FormikProps<Tour>
}

const PriceInfo: FunctionComponent<PriceInfoProps> = ({ formik }) => {
  const { dirty, errors, values, handleBlur, handleChange, isValid, touched, setFieldValue, handleReset } = formik

  return (
    <div className="grid  xl:grid-cols-2 2xl:grid-cols-4 gap-x-4 gap-y-6">
      <div className="col-span-2 xl:col-span-1">
        <Input
          label="Price single"
          labelPlacement="outside"
          placeholder="Tour price single"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.price_single?.toString()}
          onClear={() => setFieldValue('price_single', null)}
          name="price_single"
          type="number"
          isClearable
          isInvalid={touched.price_single && !!errors.price_single}
          startContent={
            <div className="pointer-events-none flex items-center border-r pr-2">
              <span className="text-default-400 text-small">OMR</span>
            </div>
          }
        />
      </div>
      <div className="col-span-2 xl:col-span-1">
        <Input
          label="Price double"
          labelPlacement="outside"
          placeholder="Tour price double"
          onClear={() => setFieldValue('price_double', null)}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.price_double?.toString()}
          name="price_double"
          isClearable
          isInvalid={touched.price_double && !!errors.price_double}
          type="number"
          startContent={
            <div className="pointer-events-none flex items-center border-r pr-2">
              <span className="text-default-400 text-small">OMR</span>
            </div>
          }
        />
      </div>
      <div className="col-span-2 xl:col-span-1">
        <Input
          label="Price single SA"
          labelPlacement="outside"
          placeholder="Tour price single SA"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.price_single_sa?.toString()}
          onClear={() => setFieldValue('price_single_sa', null)}
          name="price_single_sa"
          type="number"
          isClearable
          isInvalid={touched.price_single_sa && !!errors.price_single_sa}
          startContent={
            <div className="pointer-events-none flex items-center border-r pr-2">
              <span className="text-default-400 text-small">SAR</span>
            </div>
          }
        />
      </div>
      <div className="col-span-2 xl:col-span-1">
        <Input
          label="Price double SA"
          labelPlacement="outside"
          placeholder="Tour price double SA"
          onClear={() => setFieldValue('price_double_sa', null)}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.price_double_sa?.toString()}
          name="price_double_sa"
          isClearable
          isInvalid={touched.price_double_sa && !!errors.price_double_sa}
          type="number"
          startContent={
            <div className="pointer-events-none flex items-center border-r pr-2">
              <span className="text-default-400 text-small">SAR</span>
            </div>
          }
        />
      </div>
    </div>
  )
}

export default PriceInfo

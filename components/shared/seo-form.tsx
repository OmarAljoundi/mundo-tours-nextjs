import { Tour } from '@/types/custom'
import { Input, Textarea } from '@nextui-org/react'
import { FormikProps } from 'formik'
import { FunctionComponent } from 'react'

interface SeoFormProps {
  formik: FormikProps<any>
}

const SeoForm: FunctionComponent<SeoFormProps> = ({ formik }) => {
  const { dirty, errors, values, handleBlur, handleChange, touched, setFieldValue } = formik

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-6">
      <div>
        <Input
          label="Seo Title"
          labelPlacement="outside"
          placeholder="Enter seo title"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.seo?.title || ''}
          name="seo.title"
          isInvalid={touched.seo && !!errors.seo}
        />
      </div>
      <div>
        <Input
          label="Seo Tags"
          labelPlacement="outside"
          placeholder="Enter seo tags"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.seo?.tags || ''}
          name="seo.tags"
          isInvalid={touched.seo && !!errors.seo}
        />
      </div>
      <div className="col-span-2">
        <Textarea
          label="Seo Description"
          labelPlacement="outside"
          placeholder="Enter seo description name"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.seo?.description || ''}
          name="seo.description"
          isInvalid={touched.seo && !!errors.seo}
          description={`Seo description should not be higher than 150 character (${values.seo?.description?.length ?? 0} / 150)`}
        />
      </div>
    </div>
  )
}

export default SeoForm

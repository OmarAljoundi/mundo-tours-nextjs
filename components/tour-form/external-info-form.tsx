import { useAttachmentModal } from '@/hooks/use-attachment-modal'
import { Tour } from '@/types/custom'
import { Button, Input, Textarea } from '@nextui-org/react'
import { FormikProps } from 'formik'
import { File, Globe } from 'lucide-react'
import { FunctionComponent, useRef, useState } from 'react'

interface ExternalInfoFormProps {
  formik: FormikProps<Tour>
}

const ExternalInfoForm: FunctionComponent<ExternalInfoFormProps> = ({ formik }) => {
  const { dirty, errors, values, handleBlur, handleChange, touched, setFieldValue } = formik
  const attachmentModal = useAttachmentModal()

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-6">
      <div>
        <Input
          label="Slug"
          labelPlacement="outside"
          placeholder="Enter slug url"
          description="Slug should not contains any spaces, use - or _ for spaces"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.slug || ''}
          name="slug"
          isInvalid={touched.slug && !!errors.slug}
          errorMessage={errors.slug && errors.slug}
          startContent={<Globe />}
        />
      </div>

      <div>
        <Input
          label="External file"
          labelPlacement="outside"
          placeholder="Your file name will be written here"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.external_file?.name || ''}
          readOnly
          disableAnimation
          classNames={{
            inputWrapper: 'pr-0',
          }}
          endContent={
            <div>
              <Button className="px-4 w-32" onClick={() => attachmentModal.onOpen(formik, 'external_file', 1)}>
                Upload
              </Button>
            </div>
          }
        />
      </div>
      <div className="col-span-2">
        <Textarea
          label="Additional Information"
          labelPlacement="outside"
          placeholder="Enter additional information"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.additional_Info || ''}
          name="additional_Info"
          isInvalid={touched.additional_Info && !!errors.additional_Info}
        />
      </div>
    </div>
  )
}

export default ExternalInfoForm

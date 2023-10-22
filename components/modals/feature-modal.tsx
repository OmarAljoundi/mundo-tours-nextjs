'use client'

import { Button, Input, ModalFooter, Textarea } from '@nextui-org/react'
import { Modal } from '../shared/modal'
import { v4 as uuidv4 } from 'uuid'
import { TourFeature } from '@/types/custom'
import { useFormik } from 'formik'
import { useState } from 'react'
import { useFeatureModal } from '@/hooks/use-feature-modal'

export const FeatureModal = () => {
  const featureModal = useFeatureModal()
  const [uniqueId, setUniqueId] = useState(uuidv4())

  const handleSubmitFeature = (formData: TourFeature) => {
    const { formik, onClose, field } = featureModal
    const tourFeature = formik!.values[field!] || []
    const oldSectionIndex = tourFeature.findIndex((x) => x.uuid === formData.uuid)

    if (oldSectionIndex !== -1) {
      const updatedSections = [...tourFeature]
      updatedSections[oldSectionIndex] = formData

      formik!.setValues({
        ...formik!.values,
        [field!]: updatedSections,
      })
    } else {
      formik!.setValues({
        ...formik!.values,
        [field!]: [...tourFeature, formData],
      })
    }

    setUniqueId(uuidv4())
    resetForm()
    onClose()
  }

  const sectionFormik = useFormik({
    initialValues: featureModal.data ?? {
      uuid: uniqueId,
      description: '',
      title: '',
    },
    onSubmit: handleSubmitFeature,
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: true,
  })

  const { handleChange, handleBlur, values, touched, errors, resetForm, handleSubmit, setFieldValue } = sectionFormik

  if (featureModal.formik == null) {
    return null
  }

  return (
    <Modal
      isOpen={featureModal.isOpen}
      onClose={featureModal.onClose}
      dialogClass="px-2"
      title="Create new feature"
      renderFooter={() => {
        return (
          <ModalFooter>
            <Button variant="bordered" color="primary" type="button" onClick={() => handleSubmit()}>
              Add new feature
            </Button>
          </ModalFooter>
        )
      }}
    >
      <form className="grid space-y-4 mt-4 gap-x-4">
        <div className="space-y-4">
          <div className="grid gap-y-4">
            <Input
              label="Feature Title"
              labelPlacement="outside"
              placeholder="Enter feature title"
              onChange={handleChange}
              onBlur={handleBlur}
              onClear={() => setFieldValue('title', '')}
              value={values.title || ''}
              name="title"
              isClearable
              isInvalid={touched.title && !!errors.title}
            />
            <Textarea
              label="Feature Description"
              labelPlacement="outside"
              placeholder="Enter feature description"
              name="description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.description && !!errors.description}
            />
          </div>
        </div>
      </form>
    </Modal>
  )
}

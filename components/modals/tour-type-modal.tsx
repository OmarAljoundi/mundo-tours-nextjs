'use client'
import { Button, Input, ModalFooter } from '@nextui-org/react'
import { Button as ShcdnButton } from '../ui/button'
import { Modal } from '../shared/modal'
import { TourType } from '@/types/custom'
import { useFormik } from 'formik'
import { X } from 'lucide-react'
import SingleImageForm from '../shared/single-image-form'
import { toast } from 'sonner'
import { createTourType, updateTourType } from '@/lib/operations'
import { REVALIDATE_TOUR_TYPE } from '@/lib/keys'
import { http } from '@/service/httpService'
import { useRouter } from 'next/navigation'
import { useModal } from '@/hooks/use-modal'

export const TourTypeModal = () => {
  const tourTypeModal = useModal()
  const router = useRouter()
  const { onClose, data } = tourTypeModal
  const handleSubmitTourType = (formData: TourType) => {
    if (data && data.id) {
      toast.promise(updateTourType(formData), {
        loading: 'Loading, Updating your type...',
        error(error) {
          return error
        },
        async success(data) {
          await http(`/api/revalidate?tag=${REVALIDATE_TOUR_TYPE}`).get()
          router.refresh()
          resetForm()
          onClose()
          return 'Tour type updated successfully'
        },
      })
    } else {
      toast.promise(createTourType(formData), {
        loading: 'Loading, Creating your type...',
        error(error) {
          return error
        },
        async success(data) {
          await http(`/api/revalidate?tag=${REVALIDATE_TOUR_TYPE}`).get()
          router.refresh()
          router.push(`/admin/dashboard/tour/types`)
          resetForm()
          onClose()
          return 'Tour type created successfully'
        },
      })
    }
  }

  const tourTypeFormik = useFormik({
    initialValues: data ?? {},
    onSubmit: handleSubmitTourType,
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: true,
  })

  const { handleChange, handleBlur, values, touched, errors, resetForm, handleSubmit, setFieldValue } = tourTypeFormik

  return (
    <Modal
      isOpen={tourTypeModal.isOpenTourType}
      onClose={tourTypeModal.onClose}
      dialogClass="px-2"
      title="Create new Tour Type"
      renderFooter={() => {
        return (
          <ModalFooter>
            <Button variant="bordered" color="primary" type="button" onClick={() => handleSubmit()}>
              Add new Tour Type
            </Button>
          </ModalFooter>
        )
      }}
    >
      <form className="grid space-y-4 mt-4 gap-x-4">
        <div className="space-y-4">
          <div className="grid gap-y-4">
            <SingleImageForm formik={tourTypeFormik} field="image" maxNumber={1}>
              {values.image && (
                <div className="image-item  border rounded-xl relative dark:bg-white w-28 mt-5">
                  <img src={values.image} alt="" className="rounded-xl w-28" />
                  <ShcdnButton
                    type="button"
                    size={'icon'}
                    variant={'ghost'}
                    className="absolute -top-2 -right-2 bg-white w-6 h-6 rounded-full border border-red-600"
                    onClick={() => {
                      setFieldValue('image', undefined)
                    }}
                  >
                    <X className="w-4 h-4 text-red-600" />
                  </ShcdnButton>
                </div>
              )}
            </SingleImageForm>
            <Input
              label="Section Title"
              labelPlacement="outside"
              placeholder="Enter Tour Type Name"
              onChange={handleChange}
              onBlur={handleBlur}
              onClear={() => setFieldValue('name', '')}
              value={values.name || ''}
              name="name"
              isClearable
              isInvalid={touched.name && !!errors.name}
            />
          </div>
        </div>
      </form>
    </Modal>
  )
}

'use client'
import SingleImageForm from '@/components/common/single-image-form'
import { Location } from '@/types/custom'
import { useFormik } from 'formik'
import { Button as ShcdnButton } from '@/components/ui/button'
import { X } from 'lucide-react'
import { Button, Input, ModalFooter, SelectItem, Tab, Tabs, Textarea } from '@nextui-org/react'
import CustomSelect from '@/components/next-ui/custom-select'
import { IMAGE_ORDERS, IMAGE_SIZES } from '@/lib/constants'
import { Modal } from '../common/modal'
import { useModal } from '@/hooks/use-modal'
import { toast } from 'sonner'
import { createDestination, updateDestination } from '@/lib/operations'
import { http } from '@/service/httpService'
import { REVALIDATE_LOCATION_LIST } from '@/lib/keys'
import { useRouter } from 'next/navigation'

const DestinationModal = () => {
  const modal = useModal()
  const router = useRouter()
  const { onClose, data } = modal
  const handleSubmitForm = async (formData: Location) => {
    if (!formData.slug) {
      formData.slug = formData.name?.replaceAll(' ', '-')
    }

    if (data && data.id) {
      toast.promise(updateDestination(formData), {
        loading: 'Loading, Updating your destination...',
        error(error) {
          return error
        },
        async success(data) {
          await http(`/api/revalidate?tag=${REVALIDATE_LOCATION_LIST}`).get()
          router.refresh()
          resetForm()
          onClose()
          return 'Destination updated successfully'
        },
      })
    } else {
      toast.promise(createDestination(formData), {
        loading: 'Loading, Creating your destination...',
        error(error) {
          return error
        },
        async success(data) {
          await http(`/api/revalidate?tag=${REVALIDATE_LOCATION_LIST}`).get()
          router.refresh()
          resetForm()
          onClose()
          if (formData.is_office) router.push(`/admin/dashboard/destination/office`)
          else router.push(`/admin/dashboard/destination`)

          return 'Destination created successfully'
        },
      })
    }
  }
  const formik = useFormik({
    initialValues: data ?? {
      image: {
        url: '',
        order: 0,
        size: 0,
        alt: '',
      },
    },
    enableReinitialize: true,
    onSubmit: handleSubmitForm,
    validateOnBlur: true,
    validateOnChange: true,
  })

  const { values, dirty, touched, errors, handleBlur, handleChange, handleReset, handleSubmit, resetForm, setFieldValue } = formik

  return (
    <Modal
      size="4xl"
      isOpen={modal.isOpenDestination}
      onClose={modal.onClose}
      dialogClass="px-2"
      title="Create new feature"
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
      {' '}
      <form onSubmit={handleSubmit}>
        <Tabs aria-label="Destination">
          <Tab key="general-info" title="General Info" as={'div'}>
            <div className="grid gap-4">
              <SingleImageForm field="image.url" maxNumber={1} formik={formik}>
                {values.image?.url && (
                  <div className="grid grid-cols-2 border p-4 mt-5">
                    <div className="image-item border rounded-xl relative dark:bg-white w-44 ">
                      <img src={values.image.url} alt="" className="w-full rounded-xl h-full" />
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
                    <div className="space-y-4">
                      <div className="flex gap-8">
                        <CustomSelect
                          size="sm"
                          label="Image Size"
                          labelPlacement="outside"
                          placeholder="Enter image size"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.image?.size || ''}
                          name="image.size"
                          isInvalid={touched.image && !!errors.image}
                        >
                          {IMAGE_SIZES.map((item) => (
                            <SelectItem key={item.size} value={item.class}>
                              {item.size}
                            </SelectItem>
                          ))}
                        </CustomSelect>
                        <CustomSelect
                          size="sm"
                          label="Image Order"
                          labelPlacement="outside"
                          placeholder="Enter image order"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.image?.order || ''}
                          name="image.order"
                          isInvalid={touched.image && !!errors.image}
                        >
                          {IMAGE_ORDERS.map((item) => (
                            <SelectItem key={item} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </CustomSelect>
                      </div>
                      <div className="flex gap-8">
                        <Input
                          size="sm"
                          label="Alt image"
                          labelPlacement="outside"
                          placeholder="Enter image name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.image?.alt || ''}
                          name="image.alt"
                          isInvalid={touched.image && !!errors.image}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </SingleImageForm>
              <Input
                label="Destination Name"
                labelPlacement="outside"
                placeholder="Enter destination name"
                onChange={handleChange}
                onBlur={handleBlur}
                onClear={() => setFieldValue('name', '')}
                value={values.name || ''}
                name="name"
                isClearable
                isInvalid={touched.name && !!errors.name}
              />
              <Input
                label="Destination Slug"
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
            </div>
          </Tab>
          <Tab key="search-engine" title="Search engine" as={'div'}>
            <div className="grid gap-y-4">
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
          </Tab>
        </Tabs>
      </form>
    </Modal>
  )
}

export default DestinationModal

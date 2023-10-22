'use client'
import SingleImageForm from '@/components/shared/single-image-form'
import { Office, SocialMedia } from '@/types/custom'
import { useFormik } from 'formik'
import { Button as ShcdnButton } from '@/components/ui/button'
import { Plus, SearchIcon, Trash, X } from 'lucide-react'
import { Button, Checkbox, CheckboxGroup, Chip, Input, ModalFooter, SelectItem, Tab, Tabs, Textarea, Tooltip, User } from '@nextui-org/react'

import { Modal } from '../shared/modal'
import { useModal } from '@/hooks/use-modal'
import { toast } from 'sonner'
import { createOffice, getTours, updateOffice } from '@/lib/operations'
import { http } from '@/service/httpService'
import { REVALIDATE_OFFICE_LIST, REVALIDATE_TOUR_LIST } from '@/lib/keys'
import { useRouter } from 'next/navigation'
import CustomSelect from '../next-ui/custom-select'
import { useState } from 'react'
import { v4 } from 'uuid'
import { Separator } from '../ui/separator'
import { ScrollArea } from '../ui/scroll-area'
import { cn } from '@/lib/utils'
import { useQuery } from 'react-query'
import GeneralInfo from '../office-form/general-info-form'
import ContactInfo from '../office-form/contact-info-form'
import BestToursForm from '../office-form/best-tours-form'
import SocialMediaForm from '../office-form/social-media-form'
import SearchEngineForm from '../office-form/search-engine-form'

const OfficeModal = () => {
  const modal = useModal()
  const router = useRouter()

  const { onClose, data } = modal

  const handleSubmitForm = async (formData: Office) => {
    if (data && data.id) {
      toast.promise(updateOffice(formData), {
        loading: 'Loading, Updating your office...',
        error(error) {
          return error
        },
        async success(data) {
          await http(`/api/revalidate?tag=${REVALIDATE_OFFICE_LIST}`).get()
          router.refresh()
          resetForm()
          onClose()
          return 'Office updated successfully'
        },
      })
    } else {
      toast.promise(createOffice(formData), {
        loading: 'Loading, Creating your office...',
        error(error) {
          return error
        },
        async success(data) {
          await http(`/api/revalidate?tag=${REVALIDATE_OFFICE_LIST}`).get()
          router.refresh()
          resetForm()
          onClose()
          router.push(`/admin/dashboard/office`)

          return 'Office created successfully'
        },
      })
    }
  }
  const formik = useFormik({
    initialValues: data ?? {},
    enableReinitialize: true,
    onSubmit: handleSubmitForm,
    validateOnBlur: true,
    validateOnChange: true,
  })

  const { values, dirty, touched, errors, handleBlur, handleChange, handleReset, handleSubmit, resetForm, setFieldValue, setValues } = formik

  return (
    <Modal
      size="4xl"
      isOpen={modal.isOpenOffice}
      classNames={{
        base: 'min-h-unit-5',
      }}
      onClose={modal.onClose}
      dialogClass="px-2"
      title={data && data.id ? 'Update office' : 'Create new office'}
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
      <form onSubmit={handleSubmit}>
        <Tabs aria-label="Destination">
          <Tab key="general-info" title="General Info" as={'div'}>
            <GeneralInfo formik={formik} />
          </Tab>
          <Tab key="contact-info" title="Contact Info" as={'div'}>
            <ContactInfo formik={formik} />
          </Tab>
          <Tab key="best-tours" title="Best Tours" as={'div'}>
            <BestToursForm formik={formik} />
          </Tab>
          <Tab key="social-media" title="Social Media" as={'div'}>
            <SocialMediaForm formik={formik} />
          </Tab>
          <Tab key="search-engine" title="Search engine" as={'div'}>
            <SearchEngineForm formik={formik} />
          </Tab>
        </Tabs>
      </form>
    </Modal>
  )
}

export default OfficeModal

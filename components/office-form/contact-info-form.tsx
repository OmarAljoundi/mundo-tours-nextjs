'use client'
import { Office, SocialMedia } from '@/types/custom'
import { FormikProps, useFormik } from 'formik'
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
import { useQuery } from '@tanstack/react-query'
import { FunctionComponent } from 'react'
import SingleImageForm from '../shared/single-image-form'

interface ContactInfoProps {
  formik: FormikProps<Office>
}

const ContactInfo: FunctionComponent<ContactInfoProps> = ({ formik }) => {
  const { values, dirty, touched, errors, handleBlur, handleChange, handleReset, handleSubmit, resetForm, setFieldValue, setValues } = formik

  return (
    <div className="grid gap-y-4">
      <Input
        label="Office Name"
        labelPlacement="outside"
        placeholder="Enter office name"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.name || ''}
        name="name"
        isInvalid={touched.name && !!errors.name}
      />
      <Input
        label="Office Email"
        labelPlacement="outside"
        placeholder="Enter office email"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.email || ''}
        name="email"
        isInvalid={touched.email && !!errors.email}
      />
      <Input
        label="Office Contact Number"
        labelPlacement="outside"
        placeholder="Enter office contact number"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.contact_number || ''}
        name="contact_number"
        isInvalid={touched.contact_number && !!errors.contact_number}
      />
      <Textarea
        label="Office Address"
        labelPlacement="outside"
        placeholder="Enter office address"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.address || ''}
        name="address"
        isInvalid={touched.address && !!errors.address}
      />
    </div>
  )
}

export default ContactInfo

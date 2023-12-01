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

interface SearchEngineFormProps {
  formik: FormikProps<Office>
}

const SearchEngineForm: FunctionComponent<SearchEngineFormProps> = ({ formik }) => {
  const { values, dirty, touched, errors, handleBlur, handleChange, handleReset, handleSubmit, resetForm, setFieldValue, setValues } = formik

  return (
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
  )
}

export default SearchEngineForm

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
import { useQuery } from 'react-query'
import { FunctionComponent } from 'react'
import SingleImageForm from '../shared/single-image-form'

interface SocialMediaFormProps {
  formik: FormikProps<Office>
}

const SocialMediaForm: FunctionComponent<SocialMediaFormProps> = ({ formik }) => {
  const [social, setSocial] = useState<SocialMedia>({ media: '', url: '' })
  const { values, dirty, touched, errors, handleBlur, handleChange, handleReset, handleSubmit, resetForm, setFieldValue, setValues } = formik

  const AddNewSocialMedia = () => {
    formik.setValues({
      ...values,
      social_media: [...(values.social_media ?? []), { ...social, uuid: v4() }],
    })
    setSocial({ media: '', url: '' })
  }
  const RemoveSocialMedia = (uuid: string) => {
    formik.setValues({
      ...values,
      social_media: [...(values.social_media ?? []).filter((x) => x.uuid !== uuid)],
    })
  }

  return (
    <>
      <div className="flex gap-x-2 items-end">
        <CustomSelect
          selectionMode="single"
          placeholder="Select a media"
          label="Media"
          labelPlacement="outside"
          onChange={(e) => setSocial({ ...social, media: e.target.value })}
          value={social.media || ''}
        >
          {['Twiter', 'Facebook', 'Youtube', 'Instagram', 'Whatsapp', 'Linkedin']
            .filter((y) => !values.social_media?.map((x) => x.media).includes(y))
            .map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
        </CustomSelect>

        <Input
          label="Media Url"
          labelPlacement="outside"
          placeholder="Enter media url"
          onChange={(e) => setSocial({ ...social, url: e.target.value })}
          value={social.url || ''}
        />
        <Button isIconOnly onClick={() => AddNewSocialMedia()} isDisabled={!(!!social.media && !!social.url)}>
          <Plus />
        </Button>
      </div>
      {values.social_media && values.social_media?.length > 0 && <Separator className="my-4" />}
      <div className="grid gap-y-4">
        {values.social_media?.map((i) => (
          <div className="flex gap-x-2 items-end" key={i.uuid!}>
            <Input classNames={{ input: 'cursor-not-allowed' }} isReadOnly value={i.media} />
            <Input classNames={{ input: 'cursor-not-allowed' }} isReadOnly value={i.url} />
            <Button isIconOnly onClick={() => RemoveSocialMedia(i.uuid!)} color="primary">
              <Trash />
            </Button>
          </div>
        ))}
      </div>
    </>
  )
}

export default SocialMediaForm

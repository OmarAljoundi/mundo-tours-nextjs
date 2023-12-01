'use client'
import SeoForm from '@/components/shared/seo-form'
import { Visa, VisaType } from '@/types/custom'
import { Button, Divider, Tab, Tabs } from '@nextui-org/react'
import { useFormik } from 'formik'
import { Save } from 'lucide-react'
import { FunctionComponent, useState } from 'react'
import VisaForm from './visa-form'
import { toast } from 'sonner'
import { PushJsonFile } from '@/lib/storage-operations'
import { v4 } from 'uuid'
import { useSetting } from '@/hooks/use-setting'
import { useRouter } from 'next/navigation'

interface VisaCreationProps {
  id?: string
}

const options = [
  {
    title: 'Visa Info',
    component: VisaForm,
  },
  {
    title: 'Search Engine',
    component: SeoForm,
  },
]

const VisaCreation: FunctionComponent<VisaCreationProps> = ({ id }) => {
  const [uuid, _] = useState(v4())
  const config = useSetting()
  const route = useRouter()
  const handleSubmitData = async (formData: VisaType) => {
    let newObject = { ...config.setting }
    if (id) {
      newObject = {
        ...newObject,
        visa: {
          ...newObject.visa?.seo,
          visa_types: [...(newObject.visa?.visa_types?.filter((x) => x.uuid !== id) ?? []), formData],
        },
      }
    } else {
      newObject = {
        ...newObject,
        visa: {
          ...newObject.visa?.seo,
          visa_types: [...(newObject.visa?.visa_types ?? []), formData],
        },
      }
    }

    config.onCreate(newObject)
    const jsonData = JSON.stringify(newObject)
    const blob = new Blob([jsonData], { type: 'application/json' })
    toast.promise(PushJsonFile(blob), {
      loading: 'Saving your changes..',
      error(error) {
        return error
      },
      success() {
        route.push('/admin/dashboard/setting/visa')
        return 'Saved successfully'
      },
    })
  }

  const formik = useFormik({
    initialValues: config.setting?.visa?.visa_types?.find((x) => x.uuid == id) ?? {
      uuid: uuid,
    },
    onSubmit: handleSubmitData,
    validateOnBlur: true,
    enableReinitialize: true,
    validateOnChange: true,
    //validationSchema: TourSchema,
  })
  return (
    <div className="flex w-full flex-col">
      <Divider className="my-4" />
      <form onSubmit={formik.handleSubmit} className="relative">
        <Tabs aria-label="Options">
          {options.map((i) => (
            <Tab key={i.title} title={i.title}>
              <i.component formik={formik} />
            </Tab>
          ))}
        </Tabs>
        <div className="absolute right-0 top-0">
          <div className="flex gap-x-4">
            <Button size="sm" color="primary" type="submit" isLoading={formik.isSubmitting} endContent={<Save />}>
              Save
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default VisaCreation

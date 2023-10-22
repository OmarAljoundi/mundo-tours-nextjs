'use client'
import SeoForm from '@/components/common/seo-form'
import { useSetting } from '@/hooks/use-setting'
import { PushJsonFile } from '@/lib/storage-operations'
import { Home, Seo, Visa } from '@/types/custom'
import { Button } from '@nextui-org/react'
import { useFormik } from 'formik'
import { Save } from 'lucide-react'
import { FunctionComponent, useState } from 'react'
import { toast } from 'sonner'

interface VisaSeoFormProps {}

const VisaSeoForm: FunctionComponent<VisaSeoFormProps> = () => {
  const [loading, setLoading] = useState(false)
  const config = useSetting()
  const SaveChanges = (formData: Visa) => {
    setLoading(true)
    let newObject = { ...config.setting }
    newObject = {
      ...newObject,
      visa: {
        ...newObject.visa,
        seo: formData.seo,
      },
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
        return 'Saved successfully'
      },
      finally() {
        setLoading(false)
      },
    })
  }
  const formik = useFormik({
    initialValues: config?.setting?.visa ?? {},
    onSubmit: SaveChanges,
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: true,
  })
  return (
    <form onSubmit={formik.handleSubmit}>
      <SeoForm formik={formik} />
      <Button color="primary" endContent={<Save />} type="submit" className="mt-8" isLoading={loading}>
        Save Changes
      </Button>
    </form>
  )
}

export default VisaSeoForm

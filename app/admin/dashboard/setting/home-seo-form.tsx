'use client'
import SeoForm from '@/components/shared/seo-form'
import { useSetting } from '@/hooks/use-setting'
import { PushJsonFile } from '@/lib/storage-operations'
import { Home, Seo } from '@/types/custom'
import { Button } from '@nextui-org/react'
import { useFormik } from 'formik'
import { Save } from 'lucide-react'
import { FunctionComponent, useState } from 'react'
import { toast } from 'sonner'

interface HomeSeoFormProps {}

const HomeSeoForm: FunctionComponent<HomeSeoFormProps> = () => {
  const [loading, setLoading] = useState(false)
  const config = useSetting()
  const SaveChanges = (formData: Home) => {
    setLoading(true)
    let newObject = { ...config.setting }
    newObject = {
      ...newObject,
      home: {
        ...newObject.home,
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
    initialValues: config?.setting?.home ?? {},
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

export default HomeSeoForm

'use client'
import SeoForm from '@/components/common/seo-form'
import { useSetting } from '@/hooks/use-setting'
import { PushJsonFile } from '@/lib/storage-operations'
import { BestTours, Home, Seo } from '@/types/custom'
import { Button } from '@nextui-org/react'
import { useFormik } from 'formik'
import { Save } from 'lucide-react'
import { FunctionComponent, useState } from 'react'
import { toast } from 'sonner'

interface ToursSeoFormProps {}

const ToursSeoForm: FunctionComponent<ToursSeoFormProps> = () => {
  const [loading, setLoading] = useState(false)
  const config = useSetting()
  const SaveChanges = (formData: BestTours) => {
    setLoading(true)
    let newObject = { ...config.setting }
    newObject = {
      ...newObject,
      best_tours: {
        ...newObject.best_tours,
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
    initialValues: config?.setting?.best_tours ?? { seo: { description: '', tags: '', title: '' } },
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

export default ToursSeoForm

'use client'
import { Tour } from '@/types/custom'
import { Button, Divider, Tab, Tabs } from '@nextui-org/react'
import { useFormik } from 'formik'
import { FunctionComponent } from 'react'
import GenralInfoForm from './general-info-form'
import { createTour, updateTour } from '@/lib/operations'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import SectionForm from './section-form'
import IncludeForm from './include-form'
import ExcludeForm from './exclude-form'
import AdditionalServiceForm from './additional-service-form'
import { http } from '@/service/httpService'
import { ATTACHMENT_PATH, REVALIDATE_TOUR_LIST } from '@/lib/keys'
import { File, Save } from 'lucide-react'
import SeoForm from '../shared/seo-form'
import HotelForm from './hotel-form'
import { TourSchema } from '@/types/validations'

interface TourFormProps {
  data?: Tour
}

const options = [
  {
    title: 'General Info',
    component: GenralInfoForm,
  },
  {
    title: 'Hotels',
    component: HotelForm,
  },

  {
    title: 'Sections',
    component: SectionForm,
  },

  {
    title: 'Includes',
    component: IncludeForm,
  },
  {
    title: 'Excludes',
    component: ExcludeForm,
  },
  {
    title: 'Additonal Services',
    component: AdditionalServiceForm,
  },
  {
    title: 'Search Engine',
    component: SeoForm,
  },
]
const TourForm: FunctionComponent<TourFormProps> = ({ data }) => {
  const router = useRouter()

  const handleSubmitData = async (formData: Tour) => {
    debugger
    if (!formData.slug) {
      formData.slug = formData.name?.trim().replaceAll(' ', '-')
    }

    if (data && data.id) {
      toast.promise(updateTour(formData), {
        loading: 'Loading, Updating your tour...',
        error(error) {
          return error
        },
        async success(data) {
          await http(`/api/revalidate?tag=${REVALIDATE_TOUR_LIST}`).get()
          router.refresh()
          return 'Tour updated successfully'
        },
      })
    } else {
      toast.promise(createTour(formData), {
        loading: 'Loading, Creating your tour...',
        error(error) {
          return error
        },
        async success(data) {
          await http(`/api/revalidate?tag=${REVALIDATE_TOUR_LIST}`).get()
          router.refresh()
          router.push(`/admin/dashboard/tour/edit/${data.id}`)
          return 'Tour created successfully'
        },
      })
    }
  }

  const formik = useFormik({
    initialValues: data ?? {
      code: undefined,
      name: undefined,
      additional_Info: undefined,
      additional_service: undefined,
      airpot_coming: undefined,
      airpot_going: undefined,
      images: undefined,
      is_active: undefined,
      number_of_days: undefined,
      slug: undefined,
      start_day: [],
      external_file: undefined,
      is_ticket_included: undefined,
      price_single: undefined,
      price_double: undefined,

      type_id: undefined,
      tour_countries: undefined,
    },
    onSubmit: handleSubmitData,
    validateOnBlur: true,
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
            <Button size="sm" color="primary" type="submit" isDisabled={formik.isSubmitting} isLoading={formik.isSubmitting} endContent={<Save />}>
              Save
            </Button>
            <Button
              as={'a'}
              size="sm"
              target="_blank"
              href={`${ATTACHMENT_PATH}/${formik.values.external_file?.name}`}
              color="primary"
              isDisabled={formik.isSubmitting || !!!formik.values.external_file}
              type="submit"
              isLoading={formik.isSubmitting}
              endContent={<File />}
            >
              Preview External File
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default TourForm

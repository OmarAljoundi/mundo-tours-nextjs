import { Tour, TourSection } from '@/types/custom'
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react'
import { FormikProps } from 'formik'
import { FunctionComponent } from 'react'
import { Edit, Plus, Trash } from 'lucide-react'
import { ScrollArea } from '../ui/scroll-area'
import { useFeatureModal } from '@/hooks/use-feature-modal'

interface AdditionalServiceFormProps {
  formik: FormikProps<Tour>
}

const AdditionalServiceForm: FunctionComponent<AdditionalServiceFormProps> = ({ formik }) => {
  const featureModal = useFeatureModal()

  const handleDelete = (uuid: string) => {
    const { setValues, values } = formik
    setValues({
      ...values,
      additional_service: values.additional_service?.filter((x) => x.uuid !== uuid) ?? [],
    })
  }

  const CardComponent = (data: TourSection) => {
    const { description, title, image, uuid } = data
    return (
      <Card className="w-full max-h-64 h-64">
        <CardHeader className="justify-between">
          <div className="flex gap-5 ">
            <div className="flex flex-col gap-1 items-start justify-center  ">
              <h4 className="text-small font-semibold  text-default-600 text-ellipsis overflow-hidden line-clamp-1 leading-5">{title}</h4>
            </div>
          </div>
        </CardHeader>
        <ScrollArea className="max-h-32 min-h-[128px] mt-4 bg-gray-300">
          <CardBody className="px-3 text-small text-black py-2 ">
            <p>{description}</p>
          </CardBody>
        </ScrollArea>
        <CardFooter className="gap-3  px-0">
          <div className="flex gap-1">
            <p className="font-semibold text-default-400 text-small">
              <Button
                isIconOnly
                className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                radius="full"
                variant="light"
                onPress={() => featureModal.onOpen(formik, 'additional_service', data)}
              >
                <Edit />
              </Button>
            </p>
            <p className="text-default-400 text-small">
              <Button
                isIconOnly
                className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                radius="full"
                variant="light"
                onPress={() => handleDelete(uuid)}
              >
                <Trash />
              </Button>
            </p>
          </div>
        </CardFooter>
      </Card>
    )
  }
  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8  mt-4 gap-x-4 gap-y-6">
      <Card className="w-full max-h-64 h-64">
        <CardBody className="px-3 py-0 text-small text-default-400 flex items-center justify-center min-h-[160px] h-40">
          <Button
            isIconOnly
            disableRipple
            className="text-default-900/60 data-[hover]:bg-foreground/10 border"
            radius="full"
            variant="light"
            onPress={() => featureModal.onOpen(formik, 'additional_service')}
          >
            <Plus />
          </Button>
          <p className="text-center">Click to create a new feature</p>
        </CardBody>
      </Card>
      {formik.values.additional_service?.map((section) => (
        <CardComponent key={section.title} {...section} />
      ))}
    </div>
  )
}

export default AdditionalServiceForm

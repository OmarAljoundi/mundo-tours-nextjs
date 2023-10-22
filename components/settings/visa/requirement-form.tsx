import { Separator } from '@/components/ui/separator'
import { Visa, VisaType } from '@/types/custom'
import { Button, Input } from '@nextui-org/react'
import { FormikProps } from 'formik'
import { Plus, Trash } from 'lucide-react'
import { FunctionComponent, useState } from 'react'

interface RequirementFormProps {
  formik: FormikProps<VisaType>
}

const RequirementForm: FunctionComponent<RequirementFormProps> = ({ formik }) => {
  const [title, setTitle] = useState<string>()
  const { values, setValues } = formik

  const AddRequirement = () => {
    setValues({
      ...values,

      requirements: [...(values.requirements ?? []), title!],
    })
    setTitle('')
  }

  const RemoveRequirement = (_index: number) => {
    setValues({
      ...values,
      requirements: values.requirements?.filter((x, index) => index !== _index),
    })
  }

  return (
    <div className="col-span-2">
      <div className="flex gap-x-2 items-end">
        <Input
          label="Requirement"
          labelPlacement="outside"
          placeholder="Enter requirement here"
          onChange={(e) => setTitle(e.target.value)}
          value={title || ''}
        />
        <Button isIconOnly isDisabled={!!!title} onPress={() => AddRequirement()}>
          <Plus />
        </Button>
      </div>
      <Separator className="my-2" />
      <div className="grid gap-y-4">
        {values.requirements?.map((k, index) => (
          <div className="flex gap-x-2 " key={k}>
            <Input isDisabled key={k} value={k || ''} />
            <Button color="danger" isIconOnly onPress={() => RemoveRequirement(index)}>
              <Trash />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RequirementForm

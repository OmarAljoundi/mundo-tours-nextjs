import { Tour } from '@/types/custom'
import { FormikProps } from 'formik'
import { FunctionComponent } from 'react'
import { Button } from '../ui/button'
import CommonImageForm from '../shared/multiple-image-form'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ImageFormProps {
  formik: FormikProps<Tour>
}

const ImageForm: FunctionComponent<ImageFormProps> = ({ formik }) => {
  const onImageRemove = (image: string) => {
    formik.setValues({
      ...formik.values,
      images: [...(formik.values.images?.filter((x) => x !== image) ?? [])],
    })
  }

  return (
    <div className="col-span-3  xl:col-span-2">
      <CommonImageForm formik={formik} field="images" maxNumber={5}>
        <div className="grid grid-cols-2 mt-2 rounded-t-none gap-2">
          {formik.values.images?.map((image, index) => (
            <div key={index} className="image-item  border rounded-xl relative dark:bg-white">
              <img src={image} alt="" className={cn(index % 2 == 0 ? 'w-full  rounded-bl-xl ' : 'w-full  rounded-br-xl ')} />
              <Button
                type="button"
                size={'icon'}
                variant={'ghost'}
                className={cn('absolute top-0  bg-white w-6 h-6 rounded-full border border-red-600', index % 2 == 0 ? '-left-0' : '-right-0')}
                onClick={() => {
                  onImageRemove(image)
                }}
              >
                <X className="w-4 h-4 text-red-600" />
              </Button>
            </div>
          ))}
        </div>
      </CommonImageForm>
    </div>
  )
}

export default ImageForm

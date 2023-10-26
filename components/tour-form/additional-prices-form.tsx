import { Tour, TourPrice } from '@/types/custom'
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Chip } from '@nextui-org/react'
import { FormikProps } from 'formik'
import { FunctionComponent } from 'react'
import { Edit, Plus, Trash, X } from 'lucide-react'
import { ScrollArea } from '../ui/scroll-area'
import { usePriceModal } from '@/hooks/use-price-modal'
import { v4 } from 'uuid'
import { Separator } from '../ui/separator'
import { format } from 'date-fns'

interface AdditionalPricesFormProps {
  formik: FormikProps<Tour>
}

const AdditionalPricesForm: FunctionComponent<AdditionalPricesFormProps> = ({ formik }) => {
  const { isOpen, onClose, onOpen } = usePriceModal()

  const handleDelete = (uuid: string) => {
    const { setValues, values } = formik
    setValues({
      ...values,
      tour_prices: values.tour_prices?.filter((x) => x.uuid !== uuid) ?? [],
    })
  }

  const CardComponent = (data: TourPrice) => {
    const { include_all_month, balcony_price, date, internal_price, price, sea_view_price, one_price, uuid } = data
    return (
      <Badge content={one_price ? 'One Price' : 'Multiple Prices'} color="primary" className="right-0 translate-x-0 rounded-none">
        <Card className="w-full max-h-52 h-52">
          <CardBody className="overflow-visible">
            {one_price ? (
              <div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium leading-none">Showing below single price</h4>
                  <div className="flex justify-between">
                    <h5 className="text-sm font-medium leading-none">
                      Date: {date ? format(new Date(date?.toString()), 'PPP') : 'No date was provided'}
                    </h5>
                    {include_all_month ? <span className="text-sm">For All Month </span> : <span className="text-sm"> For Single Day </span>}
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="flex  items-center text-xs divide-x-2 ">
                  <div className="grid gap-y-2 px-2">
                    <div>Price</div>
                    <Chip className="rounded-sm text-white" color="secondary">
                      {price}
                    </Chip>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium leading-none">Showing below multiple prices</h4>
                  <div className="flex justify-between">
                    <h5 className="text-sm font-medium leading-none">
                      Date: {date ? format(new Date(date?.toString()), 'PPP') : 'No date was provided'}
                    </h5>
                    {include_all_month ? <span className="text-sm">For All Month </span> : <span className="text-sm"> For Single Day </span>}
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="flex  items-center text-xs divide-x-2 ">
                  <div className="grid gap-y-2 px-2">
                    <div>Balcony price</div>
                    <Chip className="rounded-sm text-white" color="secondary">
                      {balcony_price}
                    </Chip>
                  </div>
                  <div className="grid gap-y-2 px-2">
                    <div>Internal price</div>
                    <Chip className="rounded-sm text-white" color="secondary">
                      {internal_price}
                    </Chip>
                  </div>
                  <div className="grid gap-y-2 px-2">
                    <div>Sea view price</div>
                    <Chip className="rounded-sm text-white" color="secondary">
                      {sea_view_price}
                    </Chip>
                  </div>
                </div>
              </div>
            )}
          </CardBody>
          <CardFooter className="gap-3  px-0">
            <div className="flex gap-1">
              <p className="font-semibold text-default-400 text-small">
                <Button
                  isIconOnly
                  className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                  radius="full"
                  variant="light"
                  onPress={() => onOpen(formik, data)}
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
      </Badge>
    )
  }
  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4  mt-4 gap-x-4 gap-y-6">
      <Card className="w-full  max-h-52 h-52">
        <CardBody className="px-3 py-0 text-small text-default-400 flex items-center justify-center min-h-[112px] h-28">
          <div className="grid gap-y-4 justify-items-center">
            <Button
              size="md"
              className="text-default-900/60 data-[hover]:bg-foreground/10 border rounded-none"
              radius="full"
              endContent={<Plus />}
              onPress={() => onOpen(formik, { one_price: true, uuid: v4() })}
            >
              Add One Price
            </Button>
            <span>- OR -</span>
            <Button
              size="md"
              className="text-default-900/60 data-[hover]:bg-foreground/10 border rounded-none"
              radius="full"
              endContent={<Plus />}
              onPress={() => onOpen(formik, { one_price: false, uuid: v4() })}
            >
              Add Multiple Price
            </Button>
          </div>
        </CardBody>
      </Card>
      {formik.values.tour_prices?.map((section) => (
        <CardComponent key={section.uuid} {...section} />
      ))}
    </div>
  )
}

export default AdditionalPricesForm

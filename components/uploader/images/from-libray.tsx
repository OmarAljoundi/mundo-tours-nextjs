import { ListAllImagesInBucket } from '@/lib/storage-operations'
import { FC, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from '../../ui/skeleton'
import { formatBytes } from '@/lib/helpers'
import { Check } from 'lucide-react'
import { ScrollArea } from '../../ui/scroll-area'
import { FormikProps } from 'formik'
import { cn } from '@/lib/utils'
import { Button, Card, CardBody, CardHeader, Image } from '@nextui-org/react'
import { TOUR_IMAGE } from '@/lib/keys'
import NextImage from 'next/image'
const FromLibrary: FC<{
  formik: FormikProps<any>
  closeModal: () => void
  selectedImages: string[]
  setSelectedImages: (select: string[]) => void
  loadingDelete: boolean
}> = ({ selectedImages, setSelectedImages, loadingDelete }) => {
  const { data, isLoading } = useQuery(
    ['images'],
    async () => {
      const res = await ListAllImagesInBucket(100, 0)
      return res
    },
    {
      refetchInterval: false,
    },
  )

  useEffect(() => {
    return () => {
      setSelectedImages([])
    }
  }, [])

  const getImageLink = (imagePath: string) => `${process.env.NEXT_PUBLIC_IMAGE_URL!}/${imagePath}`

  return (
    <ScrollArea className="h-[550px] rounded-md border p-4">
      <div className="grid grid-cols-5 gap-4 ">
        {isLoading &&
          Array.from(new Array(6)).map((i) => (
            <div key={i} className="image-item border border-dashed rounded-xl relative">
              <Skeleton className="w-full rounded-xl h-36" />
            </div>
          ))}
        {data?.map((image, index) => (
          <Card
            key={index}
            className={cn(loadingDelete && selectedImages.includes(getImageLink(`${TOUR_IMAGE}/${image.name}`)) ? 'opacity-40' : 'opacity-100')}
            shadow="sm"
          >
            <CardHeader className="p-0">
              <Image
                loading="lazy"
                isBlurred
                isZoomed
                src={getImageLink(`${TOUR_IMAGE}/${image.name}`)}
                alt=""
                classNames={{
                  zoomedWrapper: 'rounded-b-none',
                }}
                className="w-full rounded-none max-h-52"
              />
            </CardHeader>
            <CardBody className="justify-end">
              <span className="max-w-[75%] truncate mt-3">{image.name}</span>
              <span className="text-xs">{formatBytes(image?.metadata?.size ?? 0, 2)}</span>
              {selectedImages?.includes(getImageLink(`${TOUR_IMAGE}/${image.name}`)) ? (
                <Button
                  size={'sm'}
                  className="my-2"
                  variant={'bordered'}
                  color="danger"
                  onClick={() => {
                    setSelectedImages([...selectedImages.filter((x) => x !== getImageLink(`${TOUR_IMAGE}/${image.name}`))])
                  }}
                >
                  Unselect Image
                </Button>
              ) : (
                <Button
                  size={'sm'}
                  className="my-2"
                  variant={'bordered'}
                  color="primary"
                  onClick={() => {
                    setSelectedImages([...selectedImages, getImageLink(`${TOUR_IMAGE}/${image.name}`)])
                  }}
                >
                  Select Image
                </Button>
              )}

              {selectedImages?.includes(getImageLink(`${TOUR_IMAGE}/${image.name}`)) && (
                <Button type="button" isIconOnly className="absolute top-2 right-2 bg-green-600  rounded-full  " size="sm">
                  <Check className="w-4 h-4 text-white" />
                </Button>
              )}
            </CardBody>
          </Card>
        ))}
      </div>
    </ScrollArea>
  )
}

export default FromLibrary

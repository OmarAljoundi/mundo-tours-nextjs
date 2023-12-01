import { ListAllAttachmentsInBucket, ListAllImagesInBucket } from '@/lib/storage-operations'
import { FC, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from '../../ui/skeleton'
import { formatBytes } from '@/lib/helpers'
import { Check, FileText, MousePointerSquare } from 'lucide-react'
import { ScrollArea } from '../../ui/scroll-area'
import { FormikProps } from 'formik'
import { cn } from '@/lib/utils'
import { Button, Card, CardBody, Tooltip } from '@nextui-org/react'
import { ATTACHMENT_PATH, TOUR_IMAGE } from '@/lib/keys'
import { ExternalFile } from '@/types/custom'
import Link from 'next/link'
import { formatDistance, subDays } from 'date-fns'

const FromLibrary: FC<{
  formik: FormikProps<any>
  closeModal: () => void
  selectedAttachments: ExternalFile[]
  setselectedAttachments: (select: ExternalFile[]) => void
  loadingDelete: boolean
}> = ({ selectedAttachments, setselectedAttachments, loadingDelete }) => {
  const { data, isLoading } = useQuery(
    ['attachmnets'],
    async () => {
      const res = await ListAllAttachmentsInBucket(100, 0)
      return res
    },
    {
      refetchInterval: false,
    },
  )

  useEffect(() => {
    return () => {
      setselectedAttachments([])
    }
  }, [])

  return (
    <div className="w-full">
      <ScrollArea className="h-[550px] ">
        <div className="rounded-md border  grid grid-cols-6 gap-4 p-4">
          {isLoading &&
            Array.from(new Array(6)).map((i) => (
              <div key={i} className="image-item border border-dashed rounded-xl relative">
                <Skeleton className="w-full rounded-xl h-36" />
              </div>
            ))}
          {data?.map((file, index) => (
            <Card
              key={index}
              className={cn(loadingDelete && selectedAttachments.find((x) => x.name == file.name) ? 'opacity-40' : 'opacity-100', 'relative')}
            >
              <div className="absolute right-0 top-0 z-50">
                <Tooltip content="Preview file!">
                  <Button variant="flat" target="_blank" color="warning" size="sm" isIconOnly as={'a'} href={`${ATTACHMENT_PATH}/${file.name}`}>
                    <MousePointerSquare className="w-4 h-4" />
                  </Button>
                </Tooltip>
              </div>
              <CardBody className="justify-end">
                <FileText />
                <span className="max-w-[75%] truncate mt-3">{file.name}</span>
                <span className="text-xs">{formatBytes(file?.metadata?.size ?? 0, 2)}</span>
                <span className="text-xs">{formatDistance(subDays(new Date(file?.created_at!), 0), new Date(), { addSuffix: true })}</span>

                {selectedAttachments.find((x) => x.name == file.name) ? (
                  <Button
                    size={'sm'}
                    className="my-2"
                    variant={'bordered'}
                    color="danger"
                    onClick={() => {
                      setselectedAttachments([...selectedAttachments.filter((x) => x.name !== file.name)])
                    }}
                  >
                    Unselect File
                  </Button>
                ) : (
                  <Button
                    size={'sm'}
                    className="my-2"
                    variant={'bordered'}
                    color="primary"
                    onClick={() => {
                      setselectedAttachments([...selectedAttachments, file])
                    }}
                  >
                    Select File
                  </Button>
                )}

                {selectedAttachments?.find((x) => x.name === file.name) && (
                  <Button type="button" isIconOnly className="absolute top-2 right-2 bg-green-600  rounded-full  " size="sm">
                    <Check className="w-4 h-4 text-white" />
                  </Button>
                )}
              </CardBody>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

export default FromLibrary

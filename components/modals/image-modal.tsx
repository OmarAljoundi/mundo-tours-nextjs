'use client'
import { useImageModal } from '@/hooks/use-image-modal'
import UploadNewImages from '../uploader/images/new-images'
import FromLibrary from '../uploader/images/from-libray'
import { Button, ModalFooter, Select, Tab, Tabs } from '@nextui-org/react'
import { Modal } from '../shared/modal'
import { useState } from 'react'
import { DeleteImageFromTour } from '@/lib/storage-operations'

export const ImageModal = () => {
  const imageModal = useImageModal()
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [loadingDelete, setLoadingDelete] = useState(false)

  const UploadImages = () => {
    if (imageModal.maxNumber! > 1) {
      imageModal.formik!.setValues({
        ...imageModal.formik!.values,
        [imageModal.field!]: [...(imageModal.formik!.values.images ?? []), ...selectedImages],
      })
    } else {
      if (imageModal.field!.includes('.')) {
        const columns = imageModal.field!.split('.')
        imageModal.formik!.setValues({
          ...imageModal.formik!.values,
          [columns[0]]: {
            ...imageModal.formik?.values[columns[0]],
            [columns[1]]: selectedImages[0],
          },
        })
      } else {
        imageModal.formik!.setValues({
          ...imageModal.formik!.values,
          [imageModal.field!]: selectedImages[0],
        })
      }
    }

    imageModal.onClose()
  }

  const DeleteImages = async () => {
    setLoadingDelete(true)
    const { success, error } = await DeleteImageFromTour(selectedImages)
    if (!success) {
      return
    }
    setLoadingDelete(false)
    setSelectedImages([])
  }

  const FooterComponent = () => {
    return (
      <ModalFooter>
        <div className="flex gap-x-4">
          <Button color="danger" onClick={DeleteImages} disabled={selectedImages.length == 0}>
            Remove
          </Button>
          <Button color="primary" onClick={UploadImages} disabled={selectedImages.length == 0}>
            Upload
          </Button>
        </div>
      </ModalFooter>
    )
  }

  return (
    <Modal
      size="5xl"
      title="Images Library"
      isOpen={imageModal.isOpen}
      onClose={imageModal.onClose}
      dialogClass="max-w-[1000px] max-h-[800px] h-full"
      renderFooter={FooterComponent}
    >
      <Tabs defaultValue="upload_new_imagess" className="w-full mt-8">
        <Tab className="w-full" title={'Upload New Images'}>
          <UploadNewImages selectedImages={selectedImages} setSelectedImages={setSelectedImages} />
        </Tab>
        <Tab className="w-full" title={'From my library'}>
          <FromLibrary
            loadingDelete={loadingDelete}
            formik={imageModal.formik!}
            closeModal={() => imageModal.onClose()}
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
          />
        </Tab>
      </Tabs>
    </Modal>
  )
}

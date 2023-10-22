import { useAttachmentModal } from '@/hooks/use-attachment-modal'
import { FunctionComponent, useState } from 'react'
import { Modal } from '../common/modal'
import { Button, ModalFooter, Tab, Tabs } from '@nextui-org/react'
import UploadNewAttachments from '../uploader/attachments/new-attachments'
import FromLibrary from '../uploader/attachments/from-libray'
import { ExternalFile } from '@/types/custom'

interface AttachmentModalProps {}

const AttachmentModal: FunctionComponent<AttachmentModalProps> = () => {
  const attachemntModal = useAttachmentModal()
  const [selectedAttachments, setSelectedAttachment] = useState<ExternalFile[]>([])
  const [loadingDelete, setLoadingDelete] = useState(false)

  const UploadAttachment = () => {
    attachemntModal.formik!.setValues({
      ...attachemntModal.formik!.values,
      [attachemntModal.field!]: selectedAttachments[0],
    })

    attachemntModal.onClose()
  }

  const DeleteAttachment = async () => {
    setLoadingDelete(true)
    // const { success, error } = await DeleteImageFromTour(selectedAttachments)
    // if (!success) {
    //   return
    // }
    setLoadingDelete(false)
    setSelectedAttachment([])
  }

  const FooterComponent = () => {
    return (
      <ModalFooter>
        <div className="flex gap-x-4">
          <Button color="primary" onClick={UploadAttachment} disabled={selectedAttachments.length == 0}>
            Upload
          </Button>
          <Button color="danger" onClick={DeleteAttachment} disabled={selectedAttachments.length == 0}>
            Remove
          </Button>
        </div>
      </ModalFooter>
    )
  }

  return (
    <Modal
      size="5xl"
      title="Attachemnt Library"
      isOpen={attachemntModal.isOpen}
      onClose={attachemntModal.onClose}
      dialogClass="max-w-[1000px] max-h-[800px] h-full"
      renderFooter={FooterComponent}
    >
      <Tabs defaultValue="upload_new_attachments" className="w-full">
        <Tab className="w-full" key={'upload_new_attachments'} title={'Upload New Attachments'}>
          <UploadNewAttachments selectedAttachments={selectedAttachments} setselectedAttachments={setSelectedAttachment} />
        </Tab>
        <Tab className="w-full" key={'from_my_library'} title={'From my library'}>
          <FromLibrary
            loadingDelete={loadingDelete}
            formik={attachemntModal.formik!}
            closeModal={() => attachemntModal.onClose()}
            selectedAttachments={selectedAttachments}
            setselectedAttachments={setSelectedAttachment}
          />
        </Tab>
      </Tabs>
    </Modal>
  )
}

export default AttachmentModal

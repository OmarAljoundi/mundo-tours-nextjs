import VisaCreation from '@/components/settings/visa'
import { GetJsonFile } from '@/lib/storage-operations'
import { http } from '@/service/httpService'
import { Visa } from '@/types/custom'
import { notFound } from 'next/navigation'
import { FunctionComponent } from 'react'

interface EditVisaPageProps {
  params: { uuid: string }
}

const EditVisaPage: FunctionComponent<EditVisaPageProps> = async ({ params }) => {
  return (
    <div className="px-8">
      <h1 className="text-3xl mt-16">Edit Visa</h1>
      <h1>Visa Form</h1>
      <VisaCreation id={params.uuid} />
    </div>
  )
}

export default EditVisaPage

import VisaCreation from '@/components/settings/visa'
import { FunctionComponent } from 'react'

interface VisaCreateNewProps {}

const VisaCreateNew: FunctionComponent<VisaCreateNewProps> = () => {
  return (
    <div className="px-8">
      <h1 className="text-3xl mt-16">Create new Visa</h1>
      <h1>Visa Form</h1>
      <VisaCreation />
    </div>
  )
}

export default VisaCreateNew

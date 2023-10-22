import TourForm from '@/components/tour-form'
import { Divider } from '@nextui-org/react'
import { FunctionComponent } from 'react'

interface NewTourPageProps {}

const NewTourPage: FunctionComponent<NewTourPageProps> = () => {
  return (
    <div className="px-8">
      <h1 className="text-3xl mt-16">Create new tour</h1>

      <TourForm />
    </div>
  )
}

export default NewTourPage

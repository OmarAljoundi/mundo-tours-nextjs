import { Separator } from '@/components/ui/separator'
import { FunctionComponent } from 'react'
import CardList from './card-list'

interface FaqPageProps {}

const FaqPage: FunctionComponent<FaqPageProps> = () => {
  return (
    <div className=" lg:px-4 ">
      <div className=" h-full flex-1 flex-col space-y-8 p-8 flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <p className="text-muted-foreground">Here&apos;s a list of your faqs!</p>
          </div>
        </div>
        <CardList />
        <Separator />
      </div>
    </div>
  )
}

export default FaqPage

import { FunctionComponent } from 'react'
import CardList from './card-list'
import { Separator } from '@/components/ui/separator'
import HomeSeoForm from './home-seo-form'

interface HomePageProps {}

const HomePage: FunctionComponent<HomePageProps> = () => {
  return (
    <div className="lg:px-4 grid">
      <div className=" h-full flex-1 flex-col space-y-8 p-8 flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <p className="text-muted-foreground">Here&apos;s a list of your slides!</p>
          </div>
        </div>
        <CardList />
        <Separator />
      </div>
      <div className="p-8">
        <div className="shadow-card p-8">
          <HomeSeoForm />
        </div>
      </div>
    </div>
  )
}

export default HomePage

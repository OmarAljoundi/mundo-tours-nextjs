import { FunctionComponent, Suspense } from 'react'
import CardList from './card-list'

interface HotelPageProps {}

const HotelPage: FunctionComponent<HotelPageProps> = () => {
  return (
    <Suspense fallback={<h1>Loading..</h1>}>
      <CardList />
    </Suspense>
  )
}

export default HotelPage

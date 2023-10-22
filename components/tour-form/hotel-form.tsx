import { Button, Chip, Input } from '@nextui-org/react'
import { Hotel, Plus } from 'lucide-react'
import React, { FunctionComponent, useState } from 'react'

import { FormikProps } from 'formik'
import { Tour } from '@/types/custom'

interface HotelFormProps {
  formik: FormikProps<Tour>
}

const HotelForm: FunctionComponent<HotelFormProps> = ({ formik }) => {
  const { values, setValues } = formik
  const [hotel, setHotel] = useState<string>('')

  const handleAddHotel = () => {
    setValues({
      ...values,
      tour_hotels: [...(values.tour_hotels ?? []), hotel],
    })
    setHotel('')
  }

  const handleDeleteHotel = (hotelId: number) => {
    setValues({
      ...values,
      tour_hotels: [...(values.tour_hotels?.filter((_, index) => index !== hotelId) ?? [])],
    })
  }

  return (
    <div className="w-full border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100 col-span-7">
      <div className="grid grid-cols-10  divide-x-2">
        <div className="px-4 col-span-6 lg:col-span-5">
          <div className="flex gap-x-2">
            <Input
              startContent={<Hotel />}
              placeholder={'Enter hotel name'}
              value={hotel}
              size="md"
              onChange={(event) => setHotel(event.target.value)}
            />

            <Button size="md" isIconOnly variant="flat" onPress={() => handleAddHotel()}>
              <Plus />
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 justify-center lg:justify-start lg:px-2 content-start  col-span-4 lg:col-span-5">
          {values.tour_hotels?.map((hotel, hotel_index) => (
            <Chip key={hotel_index} onClose={() => handleDeleteHotel(hotel_index)} variant="flat" className="py-6 px-2">
              {hotel}
            </Chip>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HotelForm

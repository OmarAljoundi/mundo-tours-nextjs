import * as yup from 'yup'
import { Hotel, Tour } from './custom'

export const UserSchema = yup.object().shape({
  email: yup.string().email('Email not in a correct format!').required('Email is required'),
  password: yup.string().required('Password is required'),
})

type SchemaObject<T> = {
  [key in keyof T]: yup.Schema<any>
}

export const TourSchema = yup.object().shape<SchemaObject<Tour>>({
  name: yup.string().required('Name is required'),
  //slug: yup.string().required('Slug is required!'),
  code: yup.string().required('Code is required!'),
  is_active: yup.boolean().nullable(),
  is_ticket_included: yup.boolean().nullable(),
  number_of_days: yup.number().min(1, 'Number of days should be greater than 1').required('Number of days is required'),
  price: yup.number().required('Price is required'),
  start_day: yup.array().min(1, 'At least one day should be added').required('Start day is required'),
  tour_countries: yup.array().min(1, 'At least one country should be added').required('Country is required'),
  type_id: yup.number().required('Tour type is required'),
})

export const HotalSchema = yup.object().shape<SchemaObject<Hotel>>({
  images: yup.array().min(1, 'You need to add at least one image').max(5, 'For better performance max images are 5').required('Images are required'),
  name: yup.string().required('Please enter the hotel name'),
  rating: yup.number().min(1, 'Rating must be greater than 1').max(5, 'Rating must be less than 5').required('Rating is required'),
})

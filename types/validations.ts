import * as yup from 'yup'
import { Hotel, Tour, TourPrice } from './custom'

export const UserSchema = yup.object().shape({
  email: yup.string().email('Email not in a correct format!').required('Email is required'),
  password: yup.string().required('Password is required'),
})

type SchemaObject<T> = {
  [key in keyof T]: yup.Schema<any>
}

export const TourSchema = yup.object().shape<SchemaObject<Tour>>({
  name: yup.string().required('Name is required'),
  slug: yup.string().required('Slug is required!'),
  code: yup.string().required('Code is required!'),
  is_active: yup.boolean().nullable(),
  is_ticket_included: yup.boolean().nullable(),
  number_of_days: yup.number().min(1, 'Number of days should be greater than 1').required('Number of days is required'),
  price_single: yup.number().required('Price Signle is required'),
  price_double: yup.number().required('Price Double is required'),
  start_day: yup.array().min(1, 'At least one day should be added').required('Start day is required'),
  tour_countries: yup.array().min(1, 'At least one country should be added').required('Country is required'),
  type_id: yup.number().required('Tour type is required'),
})

export const TourPriceSingle = yup.object().shape<SchemaObject<TourPrice>>({
  uuid: yup.string().required('UUID is required'),
  price: yup.number().required('Price is required'),
  date: yup.date().required('Date is required'),
})

export const TourPriceMultiple = yup.object().shape<SchemaObject<TourPrice>>({
  uuid: yup.string().required('UUID is required'),
  balcony_price: yup.number().required('Price is required'),
  internal_price: yup.number().required('Price is required'),
  sea_view_price: yup.number().required('Price is required'),
  date: yup.date().required('Date is required'),
})

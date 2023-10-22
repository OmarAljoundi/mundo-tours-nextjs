export type Tour = {
  additional_Info?: string | null
  additional_service?: TourFeature[] | null
  airpot_coming?: string | null
  airpot_going?: string | null
  code?: string | null
  created_at?: string
  external_file?: ExternalFile | null
  id?: number
  images?: string[] | null
  is_active?: boolean | null
  is_ticket_included?: boolean | null
  name?: string
  number_of_days?: number
  price_double?: number | null
  price_single?: number | null
  seo?: Seo | null
  start_day?: string[] | null
  tour_countries?: string[] | null
  tour_excludes?: TourFeature[] | null
  tour_includes?: TourFeature[] | null
  tour_sections?: TourSection[] | null
  tour_hotels?: string[] | null
  type_id?: number | null
  tour_type?: TourType | null
  slug?: string | null
}

export type Office = {
  address?: string | null
  best_tours?: number[] | null
  bg_primary_color?: string | null
  bg_secondary_color?: string | null
  contact_number?: string | null
  created_at?: string
  email?: string | null
  id?: number
  logo?: string | null
  name?: string | null
  primary_color?: string | null
  primary_font?: string | null
  secondary_color?: string | null
  seo?: Seo | null
  slug?: string | null
  status?: boolean | null
  third_color?: string | null
  social_media?: SocialMedia[] | null
}

export type ExternalFile = {
  name?: string
  path?: string
}
export type TourSection = {
  uuid: string
  title: string
  description: string
  image?: string
}

export type TourFeature = {
  uuid: string
  title: string
  description: string
}

export type Hotel = {
  created_at?: string
  id?: number
  images?: string[] | null
  name?: string | null
  rating?: number | null
}

export type TourHotels = {
  created_at?: string
  tour_id?: number
  hotel_id?: number
}
export type TourType = {
  created_at?: string
  id?: number
  image?: string
  name?: string
}

export type Location = {
  created_at?: string
  id?: number
  image?: Image | null
  is_active?: boolean | null
  name?: string
  seo?: Seo | null
  slug?: string | null
  is_office?: boolean | null
  location_attributes?: LocationAttributes[]
}

export type LocationTours = {
  id?: number
  location_attr_id?: number | null
  location_id: number
  tour_id: number
  created_at?: string
  location_attributes?: LocationAttributes
}
export type LocationAttributes = {
  id?: number
  order?: number | null
  seo?: Seo | null
  title?: string | null
  created_at?: string
  location_id?: number
  location_tours?: LocationTours[]
}

export type Image = {
  url: string
  size: number
  order: number
  alt: string
}

export type Seo = {
  title: string
  description: string
  tags: string
}
export type User = {
  email?: string
  password?: string
}

export type Customer = {
  contact_method: string
  created_at?: string
  id?: number
  name: string
  notes?: string | null
  phone_number: string
  status: number
  tour_id?: number | null
  tour?: Tour | null
}
export type Response<T> = {
  message: string
  success: boolean
  result?: T
  results?: T[]
}

export type Setting = {
  home?: Home
  about?: Seo
  visa?: Visa
  faq?: Faq[]
  best_tours?: BestTours
}

export type BestTours = {
  tours?: number[]
  seo: Seo
}

export type Home = {
  sliders?: Slider[]
  seo?: Seo
  best_sellers?: number[]
  best_seller_title?: ''
}

export type Visa = {
  visa_types?: VisaType[]
  seo?: Seo
}

export type Faq = {
  uuid?: string
  title?: string
  description?: string
}

export type VisaType = {
  title?: string
  sub_title?: string
  image?: string
  period?: string
  requirements?: string[]
  price?: string
  note?: string
  uuid?: string
}

export type Slider = {
  uuid: string
  image: string
  title: string
  sub_title: string
  call_to_action: string
  call_to_action_link: string
}

export type SocialMedia = {
  uuid?: string
  url: string
  media: string
}

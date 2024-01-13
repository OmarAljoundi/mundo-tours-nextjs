import { Order, SearchQuery } from '@/types/search'
import { getDestination, getTours } from './operations'
import { SearchData } from './server-actions'
import { Location, Tour } from '@/types/custom'

export const getAllPaths = async () => {
  const [tours, destination, destination_sections] = await Promise.all([getAllTours(), getAllDestination(), getAllDestinationSections()])
  return [
    {
      loc: `${process.env.NEXT_PUBLIC_URL}`,
      lastmod: new Date(),
      changefreq: 'daily',
      priority: 1.0,
    },
    ...(tours || []),
    ...destination,
    ...destination_sections,
  ]
}

const getAllTours = async () => {
  var _SQ: SearchQuery = {
    FilterByOptions: [],
    OrderByOptions: [],
    PageIndex: 0,
    PageSize: 1000,
    Select: '*,tour_type(*)',
    Table: 'tour',
  }
  const response = await SearchData<Tour>(_SQ)
  return response?.results?.map((tour) => ({
    loc: `${process.env.NEXT_PUBLIC_URL}/tour/${tour.slug}`,
    lastmod: tour.created_at || new Date(),
    changefreq: 'daily',
    priority: 0.8,
  }))
}

const getAllDestination = async () => {
  var _SQ: SearchQuery = {
    FilterByOptions: [],
    OrderByOptions: [{ MemberName: 'created_at', SortOrder: Order.DESC }],
    PageIndex: 0,
    PageSize: 1000,
    Select: '*,location_attributes(*,location_tours(*))',
    Table: 'location',
  }
  const response = await SearchData<Location>(_SQ)
  if (response.success && response.results && response.results.length > 0) {
    return response.results
      .filter((x) => x.is_active)
      .map((dest) => ({
        loc: `${process.env.NEXT_PUBLIC_URL}/tour-listing/${dest.slug}`,
        lastmod: dest.created_at || new Date(),
        changefreq: 'daily',
        priority: 0.8,
      }))
  }
  return []
}

const getAllDestinationSections = async () => {
  var _SQ: SearchQuery = {
    FilterByOptions: [],
    OrderByOptions: [{ MemberName: 'created_at', SortOrder: Order.DESC }],
    PageIndex: 0,
    PageSize: 1000,
    Select: '*,location_attributes(*,location_tours(*))',
    Table: 'location',
  }
  const response = await SearchData<Location>(_SQ)
  var results: any[] = []
  response?.results
    ?.filter((x) => x.is_active)
    .map((dest) => {
      if (dest.location_attributes && dest.location_attributes.length > 1) {
        dest.location_attributes?.map((attr) => {
          results.push({
            loc: `${process.env.NEXT_PUBLIC_URL}/tour-listing/${dest.slug}/${attr?.title?.replaceAll(' ', '-')}`,
            lastmod: attr.created_at || new Date(),
            changefreq: 'daily',
            priority: 0.8,
          })
        })
      }
    })

  return results
}

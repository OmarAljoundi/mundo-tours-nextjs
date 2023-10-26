import { Location } from '@/types/custom'
import { eFilterOperator } from '@/types/search'

type FilterOperator =
  | 'eq'
  | 'neq'
  | 'gt'
  | 'gte'
  | 'lt'
  | 'lte'
  | 'like'
  | 'ilike'
  | 'is'
  | 'not.is'
  | 'in'
  | 'cs'
  | 'cd'
  | 'sl'
  | 'sr'
  | 'nxl'
  | 'nxr'
  | 'adj'
  | 'ov'
  | 'fts'
  | 'plfts'
  | 'phfts'
  | 'wfts'

export function getEqOperator(op: eFilterOperator): FilterOperator {
  switch (op) {
    case eFilterOperator.BeginsWith:
      return 'not.is'
    case eFilterOperator.Contains:
      return 'like'

    case eFilterOperator.EqualsTo:
      return 'eq'
    case eFilterOperator.EqualsToList:
      return 'in'

    case eFilterOperator.GreaterThanOrEquals:
      return 'gte'
    case eFilterOperator.GreaterThan:
      return 'gt'
    case eFilterOperator.LessThan:
      return 'lt'
    case eFilterOperator.LessThanOrEquals:
      return 'lte'

    default:
      return 'eq'
  }
}

export function formatBytes(a: any, b = 2) {
  if (!+a) return '0 Bytes'
  const c = 0 > b ? 0 : b,
    d = Math.floor(Math.log(a) / Math.log(1024))
  return `${parseFloat((a / Math.pow(1024, d)).toFixed(c))} ${['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'][d]}`
}

export function getTotalTours(location: Location) {
  var total = 0

  location.location_attributes?.map((x) => {
    total += x.location_tours?.length ?? 0
  })
  return getWordTotal(total)
}

function getWordTotal(total: number) {
  switch (total) {
    case 0:
      return 'لاتوجد رحلات'
    case 1:
      return 'رحلة واحدة'
    case 2:
      return 'رحلاتين'
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
      return `${total} رحلات`
    default:
      return `${total} رحلة`
  }
}

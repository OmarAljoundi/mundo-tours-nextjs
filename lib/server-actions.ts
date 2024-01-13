'use server'

import { Order, SearchQuery } from '@/types/search'
import { supabaseClient } from './supabaseClient'
import { getEqOperator } from './helpers'
import { OrQuriesProp, getPagination } from './server-actions-helper'
import { Response, Setting } from '@/types/custom'
import { SETTING_PATH, CONFIG_PATH } from './keys'

export async function SearchData<T>(requestData: SearchQuery): Promise<Response<T>> {
  try {
    var OrQuries: OrQuriesProp[] = []
    var query = supabaseClient.from(requestData.Table!).select(requestData.Select, { count: 'exact' })

    requestData.FilterByOptions.map((i) => {
      if (i.MemberName.includes('.')) {
        let memberNames = i.MemberName?.split('.')
        if (OrQuries.find((x) => x.forigenTable == memberNames[0])) {
          OrQuries.map((o) => {
            if (o.forigenTable == memberNames[0]) {
              o.query += `${memberNames[1]}.${getEqOperator(i.FilterOperator)}.${i.FilterFor},`
            }
          })
        } else {
          OrQuries.push({
            forigenTable: memberNames[0],
            query: `${memberNames[1]}.${getEqOperator(i.FilterOperator)}.${i.FilterFor},`,
          })
        }
      } else {
        OrQuries.push({
          forigenTable: null,
          query: `${i.MemberName}.${getEqOperator(i.FilterOperator)}.${i.FilterFor},`,
        })
      }
    })

    if (OrQuries.length > 0) {
      OrQuries.map((o) => {
        o.query = o.query.slice(0, -1)
        if (o.forigenTable) {
          query = query.or(o.query, { foreignTable: o.forigenTable })
        } else {
          query = query.or(o.query)
        }
      })
    }

    if (requestData.OrderByOptions.length > 0) {
      query = query.order(requestData.OrderByOptions[0].MemberName, {
        ascending: requestData.OrderByOptions[0].SortOrder == Order.ASC ? true : false,
      })
    }

    const { from, to } = getPagination(requestData.PageIndex, requestData.PageSize)
    query = query.range(from, to)

    const { data: result, count, error } = await query

    if (error) {
      console.error(error)
      throw new Error(error.details)
    }
    return {
      success: true,
      results: result as T[],
      result: (result[0] as T) ?? undefined,
      total: count,
    }
  } catch (ex) {
    console.error('ex', ex)
    return {
      success: false,
      message: ex as any,
    }
  }
}

export const getContentDataAction = async () => {
  const { data, error } = await supabaseClient.storage.from('mundo_tours').list(SETTING_PATH)

  let responseData: Setting | undefined

  if (data && data.length > 0 && data.find((x) => x.name === CONFIG_PATH)) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_IMAGE_URL}/${SETTING_PATH}/${CONFIG_PATH}`, {
      next: { revalidate: 0 },
    })

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`)
    }

    responseData = (await response.json()) as Setting

    return responseData
  }
}

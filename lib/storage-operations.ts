'use client'
import { ImageListType, ImageType } from 'react-images-uploading'
import { supabaseClient } from './supabaseClient'
import { ATTACHMENT_PATH, CONFIG_PATH, SETTING_PATH } from './keys'
import { v4 } from 'uuid'
import { Setting } from '@/types/custom'

export const UploadProductImages = async (
  files: ImageListType,
  path: string,
): Promise<
  {
    image?: string
    file?: ImageType
    error: { message?: string; image?: string }
  }[]
> => {
  return await Promise.all(
    files.map(async (element) => {
      debugger
      const { data, error } = await supabaseClient.storage
        .from('mundo_tours')
        .upload(`${path}/${containsArabicText(element.file!.name)}`, element.file!, {
          cacheControl: '86400',
          contentType: 'File',
          upsert: true,
        })
      return {
        image: data?.path,
        file: !error ? element : undefined,
        error: {
          image: element.file!.name,
          message: error?.message,
        },
      }
    }),
  )
}
export const ListAllImagesInBucket = async (limit: number = 10, offest: number = 0, search?: string) => {
  var _SO: any = {
    limit: limit,
    offset: offest,
    sortBy: { column: 'name', order: 'asc' },
  }
  if (search) {
    _SO['search'] = search
  }
  const { data, error } = await supabaseClient.storage.from('mundo_tours').list('tour_images', _SO)

  if (error) {
    console.log('ERROR', error)
  }

  return data
}
export const ListAllAttachmentsInBucket = async (limit: number = 10, offest: number = 0, search?: string) => {
  var _SO: any = {
    limit: limit,
    offset: offest,
    sortBy: { column: 'name', order: 'asc' },
  }
  if (search) {
    _SO['search'] = search
  }
  const { data, error } = await supabaseClient.storage.from('mundo_tours').list(ATTACHMENT_PATH, _SO)

  if (error) {
    console.log('ERROR', error)
  }

  return data
}
export const DeleteImageFromTour = async (images: string[]) => {
  const { data, error } = await supabaseClient.storage.from('mundo_tours').remove(images)
  if (error) {
    return {
      success: false,
      error: error.message,
    }
  }
  return {
    success: true,
  }
}
export const PushAttachments = async (
  files: File[],
): Promise<
  {
    path?: string
    file?: File
    name: string
    error: { message?: string; fileName?: string }
  }[]
> => {
  return await Promise.all(
    files.map(async (element) => {
      const { data, error } = await supabaseClient.storage.from('mundo_tours').upload(`${ATTACHMENT_PATH}/${element.name}`, element!, {
        cacheControl: '86400',
        upsert: true,
      })
      return {
        path: data?.path,
        name: element.name,
        file: !error ? element : undefined,
        error: {
          fileName: element.name,
          message: error?.message,
        },
      }
    }),
  )
}

export const PushJsonFile = async (blob: Blob) => {
  const { data, error } = await supabaseClient.storage.from('mundo_tours').upload(`${SETTING_PATH}/${CONFIG_PATH}`, blob, {
    cacheControl: '86400',
    upsert: true,
  })

  if (error) {
    console.error('Error ', error)
    throw new Error('Error while saving the settings ' + error.message)
  }

  return true
}
export const GetJsonFile = async (path: string) => {
  const { data, error } = await supabaseClient.storage.from('mundo_tours').list(path)

  if (error) {
    console.error('Error while getting the settings from ', error)
    throw new Error(`Error while getting the settings from ${path} ${error.message}`)
  }

  return data
}

function containsArabicText(word: string): string {
  const words = word.split('.')
  const arabicRegex = /[\u0600-\u06FF]/
  return arabicRegex.test(words[0]) ? `${v4()}.${words[1]}` : word
}

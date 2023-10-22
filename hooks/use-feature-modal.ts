import { Tour, TourFeature, TourSection } from '@/types/custom'
import { FormikProps } from 'formik'
import { create } from 'zustand'

type fieldType = 'tour_includes' | 'tour_excludes' | 'additional_service'
interface useFeatureStore {
  isOpen: boolean
  data?: TourSection
  field?: fieldType
  formik: FormikProps<Tour> | null
  onOpen: (formik: FormikProps<Tour>, field: fieldType, data?: TourFeature) => void
  onClose: () => void
}

export const useFeatureModal = create<useFeatureStore>((set) => ({
  isOpen: false,
  formik: null,
  data: undefined,
  field: undefined,
  onOpen: (formik: FormikProps<Tour>, field: fieldType, data?: TourFeature) => set({ formik: formik, isOpen: true, data: data, field: field }),
  onClose: () => set({ isOpen: false, formik: null, data: undefined, field: undefined }),
}))

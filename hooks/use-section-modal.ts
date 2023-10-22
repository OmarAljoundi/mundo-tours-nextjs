import { Tour, TourSection } from '@/types/custom'
import { FormikProps } from 'formik'
import { create } from 'zustand'

interface useSectionStore {
  isOpen: boolean
  data?: TourSection
  formik: FormikProps<Tour> | null
  onOpen: (formik: FormikProps<Tour>, data?: TourSection) => void
  onClose: () => void
}

export const useSectionModal = create<useSectionStore>((set) => ({
  isOpen: false,
  formik: null,
  data: undefined,
  onOpen: (formik: FormikProps<Tour>, data?: TourSection) => set({ formik: formik, isOpen: true, data: data }),
  onClose: () => set({ isOpen: false, formik: null }),
}))

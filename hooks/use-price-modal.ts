import { Tour, TourPrice, TourSection } from '@/types/custom'
import { FormikProps } from 'formik'
import { create } from 'zustand'

interface usePriceStore {
  isOpen: boolean
  data?: TourPrice
  formik: FormikProps<Tour> | null
  onOpen: (formik: FormikProps<Tour>, data?: TourPrice) => void
  onClose: () => void
}

export const usePriceModal = create<usePriceStore>((set) => ({
  isOpen: false,
  formik: null,
  data: undefined,
  onOpen: (formik: FormikProps<Tour>, data?: TourPrice) => set({ formik: formik, isOpen: true, data: data }),
  onClose: () => set({ isOpen: false, formik: null }),
}))

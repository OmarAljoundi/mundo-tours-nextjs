import { FormikProps } from 'formik'
import { create } from 'zustand'

interface useAttachmentModalStore {
  isOpen: boolean
  formik?: FormikProps<any>
  field?: string
  maxNumber?: number
  onOpen: (formik: FormikProps<any>, field: string, maxNumber: number) => void
  onClose: () => void
}

export const useAttachmentModal = create<useAttachmentModalStore>((set) => ({
  isOpen: false,
  field: undefined,
  maxNumber: 1,
  formik: undefined,
  onOpen: (formik: FormikProps<any>, field: string, maxNumber: number) => set({ isOpen: true, formik: formik, field: field, maxNumber: maxNumber }),
  onClose: () => set({ isOpen: false, formik: undefined, maxNumber: 1, field: undefined }),
}))

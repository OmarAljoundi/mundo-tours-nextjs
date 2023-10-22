import { FormikProps } from 'formik'
import { create } from 'zustand'

interface useImageModalStore {
  isOpen: boolean
  formik?: FormikProps<any>
  field?: string
  maxNumber?: number
  onOpen: (formik: FormikProps<any>, field: string, maxNumber: number) => void
  onClose: () => void
}

export const useImageModal = create<useImageModalStore>((set) => ({
  isOpen: false,
  isEdit: false,
  editId: undefined,
  field: undefined,
  store: undefined,
  isMultiple: false,
  maxNumber: 1,
  onOpen: (formik: FormikProps<any>, field: string, maxNumber: number) => set({ isOpen: true, formik: formik, field: field, maxNumber: maxNumber }),
  onClose: () => set({ isOpen: false, formik: undefined, maxNumber: 1, field: undefined }),
}))

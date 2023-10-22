'use client'
import { useImageModal } from '@/hooks/use-image-modal'
import { FormikProps } from 'formik'
import { FunctionComponent, ReactNode } from 'react'

interface ImageFormProps {
  formik: FormikProps<any>
  field: string
  maxNumber: number
  children: ReactNode
}

const SingleImageForm: FunctionComponent<ImageFormProps> = ({ formik, field, maxNumber, children }) => {
  const imageModal = useImageModal()

  return (
    <div className="upload__image-wrapper">
      <div
        className="relative w-full py-2   bg-gray-100 rounded-lg shadow-inner hover:opacity-70 duration-500 transition-opacity"
        onClick={() => imageModal.onOpen(formik, field, maxNumber)}
      >
        <label htmlFor="file-upload" className="z-20 flex flex-col-reverse items-center justify-center w-full h-full cursor-pointer">
          <p className="z-10 text-xs font-light text-center text-gray-500 mt-5">Click to upload image</p>
          <h2 className="text-[9px] text-gray-500">File should be of format .png, .jpg, .jpeg or .webp</h2>
          <h2 className="text-xs text-gray-500 mt-2">File maximum size is 300Kb</h2>
          <svg className="z-10 w-8 h-8 text-indigo-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
          </svg>
        </label>
      </div>
      {children}
    </div>
  )
}

export default SingleImageForm

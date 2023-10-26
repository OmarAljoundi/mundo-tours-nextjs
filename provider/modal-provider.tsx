'use client'
import AttachmentModal from '@/components/modals/attachment-modal'
import DestinationModal from '@/components/modals/destination-modal'
import DestinationToursModal from '@/components/modals/destination-tours-modal'
import { FaqModal } from '@/components/modals/faq-modal'
import { FeatureModal } from '@/components/modals/feature-modal'
import { ImageModal } from '@/components/modals/image-modal'
import OfficeModal from '@/components/modals/office-modal'
import { PriceModal } from '@/components/modals/price-modal'
import { SectionModal } from '@/components/modals/section-modal'
import SlideModal from '@/components/modals/slide-modal'
import { TourTypeModal } from '@/components/modals/tour-type-modal'
import { useEffect, useState } from 'react'

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <ImageModal />
      <SectionModal />
      <FeatureModal />
      <TourTypeModal />
      <DestinationModal />
      <DestinationToursModal />
      <AttachmentModal />
      <FaqModal />
      <SlideModal />
      <OfficeModal />
      <PriceModal />
    </>
  )
}

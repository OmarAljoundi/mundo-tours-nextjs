'use client'
import { ModalBody, ModalContent, ModalFooter, ModalHeader, Modal as NextModal, ModalProps as NextModalProps } from '@nextui-org/react'
import { ReactNode } from 'react'

interface ModalProps {
  title?: string
  description?: string
  isOpen: boolean
  onClose: () => void
  children?: React.ReactNode
  dialogClass?: string
  renderFooter?: () => ReactNode
}

export const Modal: React.FC<ModalProps & NextModalProps> = ({
  title,
  description,
  isOpen,
  onClose,
  children,
  renderFooter,
  dialogClass = '',
  ...restProps
}) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose()
    }
  }

  return (
    <NextModal
      {...restProps}
      isOpen={isOpen}
      onOpenChange={onChange}
      backdrop="blur"
      classNames={{
        header: 'border-b-[1px] border-white',
        footer: 'border-t-[1px] border-white',
      }}
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: 'easeOut',
            },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: 'easeIn',
            },
          },
        },
      }}
    >
      <ModalContent className={dialogClass}>
        <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
        <ModalBody>{children}</ModalBody>
        {renderFooter && renderFooter()}
      </ModalContent>
    </NextModal>
  )
}

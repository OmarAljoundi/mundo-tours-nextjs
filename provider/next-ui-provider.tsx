'use client'

import { FunctionComponent, ReactNode } from 'react'
import { NextUIProvider as UIProvider } from '@nextui-org/react'

interface NextUIProviderProps {
  children: ReactNode
}

const NextUIProvider: FunctionComponent<NextUIProviderProps> = ({ children }) => {
  return <UIProvider>{children}</UIProvider>
}

export default NextUIProvider

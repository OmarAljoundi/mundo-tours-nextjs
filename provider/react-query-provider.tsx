'use client'

import { ThemeProviderProps } from 'next-themes/dist/types'
import { QueryClient, QueryClientProvider } from 'react-query'

export function ReactQueryProvider({ children, ...props }: ThemeProviderProps) {
  return <QueryClientProvider client={new QueryClient()}>{children} </QueryClientProvider>
}

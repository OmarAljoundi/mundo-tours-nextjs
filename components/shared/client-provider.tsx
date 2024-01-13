'use client'
import { FC, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import ToolBar from '../Layout/tool-bar'
import Header from '../Layout/header'
import Footer from '../Layout/footer'
import { Setting } from '@/types/custom'
import { useSetting } from '@/hooks/use-setting'
import { getUserCountry } from '@/lib/actions'

const ClientProvider: FC<{ children: React.ReactNode; content?: Setting }> = ({ children, content }) => {
  const path = usePathname()
  const [mount, setMount] = useState(false)
  const setting = useSetting()

  useEffect(() => {
    if (content) setting.onCreate(content)

    setMount(true)
  }, [])

  if (!mount) return null

  return (
    <>
      {!path.includes('admin') && (
        <>
          <ToolBar />
          <Header />
        </>
      )}

      {children}
      {!path.includes('admin') && (
        <>
          <Footer />
        </>
      )}
    </>
  )
}

export default ClientProvider

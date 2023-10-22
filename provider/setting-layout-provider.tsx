'use client'

import { useSetting } from '@/hooks/use-setting'
import { Setting } from '@/types/custom'
import { FunctionComponent, ReactNode, useEffect } from 'react'

interface SettingLayoutProviderProps {
  children: ReactNode
  settingData?: Setting
}

const SettingLayoutProvider: FunctionComponent<SettingLayoutProviderProps> = ({ children, settingData }) => {
  const setting = useSetting()

  useEffect(() => {
    if (settingData) setting.onCreate(settingData)
  }, [])
  return <>{children}</>
}

export default SettingLayoutProvider

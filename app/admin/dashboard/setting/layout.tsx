import { getContentData } from '@/lib/operations'
import SettingLayoutProvider from '@/provider/setting-layout-provider'
import { FunctionComponent, ReactNode } from 'react'
interface SettingLayoutProps {
  children: ReactNode
}

const SettingLayout: FunctionComponent<SettingLayoutProps> = async ({ children }) => {
  const responseData = await getContentData()

  return <SettingLayoutProvider settingData={responseData}>{children}</SettingLayoutProvider>
}

export default SettingLayout

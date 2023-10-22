import { Setting, TourType } from '@/types/custom'
import { create } from 'zustand'

interface useSettingProps {
  setting?: Setting
  onCreate: (setting: Setting) => void
}

export const useSetting = create<useSettingProps>((set) => ({
  types: undefined,
  onCreate: (setting: Setting) => set({ setting: setting }),
}))

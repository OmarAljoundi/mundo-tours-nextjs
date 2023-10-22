import { TourType } from '@/types/custom'
import { create } from 'zustand'

interface useStaticProps {
  types: TourType[]
  onCreate: (types: TourType[]) => void
}

export const useStatic = create<useStaticProps>((set) => ({
  types: [],
  onCreate: (types: TourType[]) => set({ types: types }),
}))

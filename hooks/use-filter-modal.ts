import { Table } from '@tanstack/react-table'
import React from 'react'
import { create } from 'zustand'

export type Filters = {
  renderFilter: (table: Table<any>) => React.ReactNode
}

interface useFilterModalStore {
  table?: Table<any>
  filters: Filters[]
  onCreate: (table: Table<any>, filters: Filters[]) => void
}

export const useFilterModal = create<useFilterModalStore>((set) => ({
  filters: [],
  onCreate: (table: Table<any>, filters: Filters[]) => set({ filters: filters, table: table }),
  onDestroy: () => set({ filters: [], table: undefined }),
}))

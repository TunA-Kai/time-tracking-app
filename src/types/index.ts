import type { Dispatch, SetStateAction } from 'react'

interface TItem {
  id: number
  date: Date
  name: string
  details: string
  color: string
}

interface TTask extends TItem {
  tags: TTag[]
}

interface TTag extends TItem {
  tasks: TTask[]
}

type TComponentType = 'task' | 'tag'
type TSortOption = 'A to Z' | 'Z to A' | 'Oldest first' | 'Newest first' | 'Color'

type SetValue<T> = Dispatch<SetStateAction<T>>

export type { TTask, TTag, TSortOption, SetValue, TItem, TComponentType }

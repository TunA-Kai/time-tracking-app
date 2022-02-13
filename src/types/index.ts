import type { Dispatch, SetStateAction } from 'react'

interface TTask {
  id: number
  date: Date
  name: string
  details: string
  color: string
  tags: TTag[]
}

interface TTag extends Omit<TTask, 'tags'> {
  tasks: TTask[]
}

type TSortOption = 'A to Z' | 'Z to A' | 'Oldest first' | 'Newest first' | 'Color'

type SetValue<T> = Dispatch<SetStateAction<T>>

export type { TTask, TTag, TSortOption, SetValue }

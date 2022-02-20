import { Timestamp } from 'firebase/firestore'
import type { Dispatch, SetStateAction } from 'react'

type Id = string

interface TItem {
  id: Id
  date: Timestamp
  name: string
  details: string
  color: string
}

interface TTask extends TItem {
  tagIds: Id[]
}

interface TTag extends TItem {}

type TComponentType = 'task' | 'tag'
type TSortOption = 'A to Z' | 'Z to A' | 'Oldest first' | 'Newest first' | 'Color'

type SetValue<T> = Dispatch<SetStateAction<T>>

export type { TTask, TTag, TSortOption, SetValue, TItem, TComponentType }

import { Timestamp } from 'firebase/firestore'
import type { Dispatch, SetStateAction } from 'react'

interface TItem {
  id: string
  date: Timestamp
  name: string
  details: string
  color: string
}

interface TTask extends TItem {
  tagIds: string[]
}

interface TTag extends TItem {}

type TComponentType = 'task' | 'tag'
type TSortOption = 'A to Z' | 'Z to A' | 'Oldest first' | 'Newest first' | 'Color'

type SetValue<T> = Dispatch<SetStateAction<T>>

enum FireStoreCollection {
  TASKS = 'tasks',
  TAGS = 'tags',
  WORKUNIT = 'work_unit',
}

export type { TTask, TTag, TSortOption, SetValue, TItem, TComponentType }
export { FireStoreCollection }

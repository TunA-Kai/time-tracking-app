import * as React from 'react'
import { mockTags } from '../../utils/mocks/mockTags'
import { SetValue, TTag } from '../../types'

interface TagContextType {
  tags: TTag[]
  setTags: SetValue<TTag[]>
}

const TagContext = React.createContext<TagContextType | undefined>(undefined)

function TagProvider({ children }: { children: React.ReactNode }) {
  const [tags, setTags] = React.useState<TTag[]>(mockTags)
  const contextValue = { tags, setTags }
  return <TagContext.Provider value={contextValue}>{children}</TagContext.Provider>
}

function useTagContext() {
  const context = React.useContext(TagContext)
  if (context === undefined) throw new Error('useTagContext must be used within a TagProvider')
  const { tags, setTags } = context
  function addTag(newTag: TTag) {
    setTags([...tags, newTag])
  }
  function deleteTag(tagId: number) {
    setTags(tags.filter(t => t.id !== tagId))
  }
  function updateTag(newTag: TTag) {
    const newTags = tags.filter(t => t.id !== newTag.id)
    setTags([...newTags, newTag])
  }
  function getTag(tagId: number) {
    return tags.find(t => t.id === tagId)
  }
  return { tags, addTag, deleteTag, updateTag, getTag }
}

export { TagProvider, useTagContext }

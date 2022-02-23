import * as React from 'react'
import { tagsColRef } from '../../firebaseConfig'
import { SetValue, TTag } from '../../types'
import { useGetCollectionFirebase } from '../../utils/hooks/useGetCollectionFirebase'

interface TagContextType {
  tags: TTag[]
  setTags: SetValue<TTag[]>
}

const TagContext = React.createContext<TagContextType | undefined>(undefined)
TagContext.displayName = 'TagContext'

function TagProvider({ children }: { children: React.ReactNode }) {
  const [tags, setTags] = useGetCollectionFirebase<TTag>(tagsColRef)
  const contextValue = React.useMemo(() => ({ tags, setTags }), [setTags, tags])

  return <TagContext.Provider value={contextValue}>{children}</TagContext.Provider>
}

function useTagContext() {
  const context = React.useContext(TagContext)
  if (context === undefined) throw new Error('useTagContext must be used within a TagProvider')
  const { tags, setTags } = context
  function addTag(newTag: TTag) {
    setTags([...tags, newTag])
  }
  function deleteTag(tagId: string) {
    setTags(tags.filter(t => t.id !== tagId))
  }
  function updateTag(newTag: TTag) {
    const newTags = tags.map(t => (t.id === newTag.id ? { ...newTag } : t))
    setTags(newTags)
  }
  function getTag(tagId: string) {
    return tags.find(t => t.id === tagId)
  }
  return { tags, addTag, deleteTag, updateTag, getTag }
}

export { TagProvider, useTagContext }

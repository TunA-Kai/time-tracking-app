import * as React from 'react'
import { Link } from 'react-router-dom'
import { ActionBar } from '../../components'
import { useTagContext } from '../../contexts/tagContext/tagContext'
import { TSortOption } from '../../types'
import { sortList } from '../../utils/helpers/sortList'
import { useLocalStorage } from '../../utils/hooks'

interface TagsHomeProps {}

function TagsHome({}: TagsHomeProps) {
  const { tags } = useTagContext()
  const [sortType, setSortType] = useLocalStorage<TSortOption>('tag_sort_type', 'Newest first')
  const [searchQuery, setSearchQuery] = React.useState<string>('')
  const sortTags = sortList(tags, sortType)
  const searchedTags =
    searchQuery.trim() === ''
      ? sortTags
      : sortTags.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <>
      <ActionBar
        type='tag'
        sortType={sortType}
        setSortType={setSortType}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <ul className='mt-4'>
        {searchedTags.map(t => (
          <li key={t.id}>
            <Link to={`edit/${t.id}`} className='button w-full gap-2'>
              <span className={`${t.color} h-4 w-4 rounded-full`}></span>
              {t.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default TagsHome

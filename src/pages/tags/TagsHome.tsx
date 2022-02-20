import * as React from 'react'
import { AiOutlineTag } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { ActionBar } from '../../components'
import { useTagContext } from '../../contexts/tagContext/tagContext'
import { useTaskContext } from '../../contexts/taskContext/taskContext'
import { TSortOption } from '../../types'
import { sortList } from '../../utils/helpers/sortList'
import { useLocalStorage } from '../../utils/hooks'

function TagsHome() {
  const { tags } = useTagContext()
  const { tasks } = useTaskContext()
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
              <div className='ml-auto flex gap-1'>
                {tasks
                  .filter(task => task.tagIds.includes(t.id))
                  .map(task => (
                    <div
                      key={task.id}
                      className={`${task.color} flex items-center gap-1 rounded-sm px-1 text-slate-900`}
                    >
                      <AiOutlineTag />
                      {task.name}
                    </div>
                  ))}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default TagsHome

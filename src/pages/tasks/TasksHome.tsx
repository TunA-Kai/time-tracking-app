import * as React from 'react'
import { AiOutlineTag } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { ActionBar } from '../../components'
import { useTagContext } from '../../contexts/tagContext/tagContext'
import { useTaskContext } from '../../contexts/taskContext/taskContext'
import { TSortOption } from '../../types'
import { sortList } from '../../utils/helpers/sortList'
import { useLocalStorage } from '../../utils/hooks/useLocalStorage'

function TasksHome() {
  const { tasks } = useTaskContext()
  const { tags } = useTagContext()
  const [sortType, setSortType] = useLocalStorage<TSortOption>('task_sort_type', 'Newest first')
  const [searchQuery, setSearchQuery] = React.useState<string>('')
  const sortTasks = sortList(tasks, sortType)
  const searchedTasks =
    searchQuery.trim() === ''
      ? sortTasks
      : sortTasks.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div>
      <ActionBar
        type='task'
        sortType={sortType}
        setSortType={setSortType}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <ul className='mt-4'>
        {searchedTasks.map(t => (
          <li key={t.id}>
            <Link to={`edit/${t.id}`} className='button w-full gap-2'>
              <span className={`${t.color} h-4 w-4 rounded-full`}></span>
              {t.name}
              <div className='ml-auto flex gap-1'>
                {tags
                  .filter(tag => t.tagIds.includes(tag.id))
                  .map(tag => (
                    <div
                      key={tag.id}
                      className={`${tag.color} flex items-center gap-1 rounded-sm px-1 text-slate-900`}
                    >
                      <AiOutlineTag />
                      {tag.name}
                    </div>
                  ))}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TasksHome

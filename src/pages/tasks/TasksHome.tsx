import { AiOutlineTag } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { ActionBar } from '../../components'
import { useTaskContext } from '../../contexts/taskContext/taskContext'
import { TSortOption } from '../../types'
import { sortList } from '../../utils/helpers/sortList'
import { useLocalStorage } from '../../utils/hooks'

interface TasksHomeProps {}

function TasksHome({}: TasksHomeProps) {
  const { tasks } = useTaskContext()
  const [sortType, setSortType] = useLocalStorage<TSortOption>('task_sort_type', 'Newest first')
  const sortTasks = sortList(tasks, sortType)

  return (
    <div>
      <ActionBar type='task' sortType={sortType} setSortType={setSortType} />
      <ul className='mt-4'>
        {sortTasks.map(t => (
          <li key={t.id}>
            <Link to={`edit/${t.id}`} className='button w-full gap-2'>
              <span className={`${t.color} h-4 w-4 rounded-full`}></span>
              {t.name}
              <div className='ml-auto flex gap-1'>
                {t.tags.map(tag => (
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

import { Link } from 'react-router-dom'
import { ActionBar } from '../../components'
import { useTaskContext } from '../../contexts/taskContext/taskContext'
import { useLocalStorage } from '../../utils/hooks'
import { TSortOption } from '../../types'
import { sortList } from '../../utils/helpers/sortList'

interface TasksHomeProps {}

function TasksHome({}: TasksHomeProps) {
  const { tasks } = useTaskContext()
  const [sortType, setSortType] = useLocalStorage<TSortOption>('task_sort_type', 'Newest first')
  const sortTasks = sortList(tasks, sortType)

  return (
    <div>
      <ActionBar type='tasks' sortType={sortType} setSortType={setSortType} />
      <ul className='mt-4'>
        {sortTasks.map(t => (
          <li key={t.id}>
            <Link to={`edit/${t.id}`} className='button w-full gap-2'>
              <span className={`${t.color} h-4 w-4 rounded-full`}></span>
              {t.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TasksHome

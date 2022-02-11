import { Link } from 'react-router-dom'
import { ActionBar } from '../../components'
import { useTaskContext } from '../../contexts/taskContext/taskContext'

interface TasksHomeProps {}

function TasksHome({}: TasksHomeProps) {
  const { tasks } = useTaskContext()
  return (
    <div>
      <ActionBar type='tasks' />
      <ul className='mt-4'>
        {tasks.map(t => (
          <li key={t.id}>
            <Link to={`edit/${t.id}`} className='button flex w-full items-center gap-2'>
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

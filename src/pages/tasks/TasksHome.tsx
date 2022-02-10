import { ActionBar } from '../../components'

interface TasksHomeProps {}

function TasksHome({}: TasksHomeProps) {
  return (
    <div>
      <ActionBar type='tasks' />
    </div>
  )
}

export default TasksHome

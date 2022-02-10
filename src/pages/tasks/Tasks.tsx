import { Outlet } from 'react-router-dom'
import { PageTitle } from '../../components'

interface TasksProps {}

function Tasks({}: TasksProps) {
  return (
    <div>
      <PageTitle title='Tasks' />
      <Outlet />
    </div>
  )
}

export default Tasks

import { Outlet } from 'react-router-dom'
import { PageTitle } from '../../components'

interface TagsProps {}

function Tags({}: TagsProps) {
  return (
    <div>
      <PageTitle title='Tags' />
      <Outlet />
    </div>
  )
}

export default Tags

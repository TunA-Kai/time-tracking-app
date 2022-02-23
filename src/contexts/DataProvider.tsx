import { TagProvider } from './tagContext/tagContext'
import { TaskProvider } from './taskContext/taskContext'
import { WorkUnitProvider } from './workUnitContext/workUnitContext'

interface DataProviderProps {
  children: React.ReactNode
}

function DataProvider({ children }: DataProviderProps) {
  return (
    <TaskProvider>
      <TagProvider>
        <WorkUnitProvider>{children}</WorkUnitProvider>
      </TagProvider>
    </TaskProvider>
  )
}

export default DataProvider

import { Outlet } from 'react-router-dom'
import { SideBar } from '.'
import { TagProvider } from '../contexts/tagContext/tagContext'
import { TaskProvider } from '../contexts/taskContext/taskContext'

interface AppLayoutProps {}

function AppLayout({}: AppLayoutProps) {
  return (
    <main className='flex h-screen w-screen text-slate-50'>
      <aside className='bg-slate-800 px-2 py-4'>
        <SideBar />
      </aside>
      <TaskProvider>
        <TagProvider>
          <div className='grow bg-slate-900 p-4'>
            <Outlet />
          </div>
        </TagProvider>
      </TaskProvider>
    </main>
  )
}

export default AppLayout

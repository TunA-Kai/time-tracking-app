import { Outlet } from 'react-router-dom'
import { PageWrapper, SideBar } from '..'
import { DataProvider } from '../../contexts/dataContext/dataContext'
import { WorkDetailsProvider } from '../../contexts/workDetailsContext/workDetailsContext'

function AppLayout() {
  return (
    <div className='flex h-screen w-screen text-slate-50'>
      <aside className='bg-slate-800 px-2 py-4'>
        <SideBar />
      </aside>
      <main className='h-full w-full grow bg-slate-900 p-4 pb-0'>
        <DataProvider>
          <PageWrapper>
            <WorkDetailsProvider>
              <Outlet />
            </WorkDetailsProvider>
          </PageWrapper>
        </DataProvider>
      </main>
    </div>
  )
}

export default AppLayout

import { Outlet } from 'react-router-dom'
import { SideBar } from '.'

interface AppLayoutProps {}

function AppLayout({}: AppLayoutProps) {
  return (
    <main className='flex h-screen w-screen text-slate-50'>
      <div className='bg-slate-800 px-2 py-4'>
        <SideBar />
      </div>
      <div className='grow bg-slate-900 p-4'>
        <Outlet />
      </div>
    </main>
  )
}

export default AppLayout

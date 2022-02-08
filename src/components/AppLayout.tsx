import { Outlet } from 'react-router-dom'
import { SideBar } from '.'

interface AppLayoutProps {}

function AppLayout({}: AppLayoutProps) {
  return (
    <main className='flex h-screen w-screen'>
      <div className='bg-lime-200 px-2 py-4'>
        <SideBar />
      </div>
      <div className='grow bg-sky-200 p-4'>
        <Outlet />
      </div>
    </main>
  )
}

export default AppLayout

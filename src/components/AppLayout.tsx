import { Outlet } from 'react-router-dom'
import { SideBar } from '.'

interface AppLayoutProps {}

function AppLayout({}: AppLayoutProps) {
  return (
    <div>
      <SideBar />
      <Outlet />
    </div>
  )
}

export default AppLayout

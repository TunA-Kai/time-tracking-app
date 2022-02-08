import { useState } from 'react'
import { VscThreeBars } from 'react-icons/vsc'
import { NavLink } from 'react-router-dom'
import { navLinks } from '../../utils/constants/navLinks'

interface SideBarProps {}

function SideBar({}: SideBarProps) {
  const [open, setOpen] = useState<boolean>(true)
  return (
    <nav className='space-y-2'>
      <button onClick={() => setOpen(o => !o)}>
        <VscThreeBars className='ml-2 h-6 w-6 cursor-pointer active:scale-75' />
      </button>
      {navLinks.map(({ id, Icon, title, to }) => (
        <NavLink
          key={id}
          to={to}
          className={({ isActive }) =>
            `flex gap-4 border-l-4 p-2 pl-1 hover:bg-lime-100 ${
              isActive ? 'border-rose-500 bg-lime-100' : 'border-transparent'
            }`
          }
        >
          <Icon className='h-6 w-6' />
          {open && <span className='hidden w-40 grow select-none lg:block'>{title}</span>}
        </NavLink>
      ))}
    </nav>
  )
}

export default SideBar

import { AiOutlineTags } from 'react-icons/ai'
import { BsBarChart } from 'react-icons/bs'
import { FiSettings } from 'react-icons/fi'
import { GrCircleInformation, GrConfigure } from 'react-icons/gr'
import { IoMdTimer } from 'react-icons/io'
import { MdTimer } from 'react-icons/md'

export const navLinks = [
  { id: 1, Icon: MdTimer, title: 'Time tracking', to: '/time_tracking' },
  { id: 2, Icon: GrConfigure, title: 'Tasks', to: '/tasks' },
  { id: 3, Icon: AiOutlineTags, title: 'Tags', to: '/tags' },
  { id: 4, Icon: BsBarChart, title: 'Analytics', to: '/analytics' },
  { id: 5, Icon: IoMdTimer, title: 'Pomodoro', to: '/pomodoro' },
  { id: 6, Icon: GrCircleInformation, title: 'About', to: '/about' },
  { id: 7, Icon: FiSettings, title: 'Settings', to: '/settings' },
]

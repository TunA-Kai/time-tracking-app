import { Menu } from '@headlessui/react'
import * as React from 'react'
import { BsArrowDownUp, BsCheck2, BsPlusCircle } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { sortOptions, TSortOption } from '../utils/constants/sortOptions'

interface ActionBarProps {
  type: 'tasks' | 'tags'
}

function ActionBar({ type }: ActionBarProps) {
  const [sortType, setSortType] = React.useState<TSortOption>('A to Z')

  return (
    <div className='flex gap-2'>
      <Menu as='div' className='relative'>
        <Menu.Button className='rounded-md p-2 hover:bg-slate-700'>
          <BsArrowDownUp className='mr-1 inline-block' />
          <span>Sort</span>
        </Menu.Button>
        <Menu.Items
          as='ul'
          className='absolute right-1/2 w-max translate-x-1/2 translate-y-2 rounded-md border-2 border-sky-500 bg-slate-800 p-2'
        >
          {sortOptions.map(({ id, type }) => (
            <Menu.Item key={id} as='li'>
              {({ active }) => (
                <button
                  className={`${active ? 'bg-slate-700' : ''} w-full py-1 px-2 text-left`}
                  onClick={() => setSortType(type as TSortOption)}
                >
                  <BsCheck2
                    className={`${sortType === type ? '' : 'text-transparent'} mr-2 inline-block`}
                  />
                  <span>{type}</span>
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>
      <input type='search' name='' className='input grow p-2' placeholder='Seach...' />
      <Link to='new' className='flex items-center gap-1 rounded-md p-2 hover:bg-slate-700'>
        <BsPlusCircle className='' />
        <span>Create new {type}</span>
      </Link>
    </div>
  )
}

export default ActionBar

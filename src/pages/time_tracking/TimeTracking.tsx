import { Disclosure, Menu } from '@headlessui/react'
import * as React from 'react'
import { BsPlusCircle, BsPlusLg } from 'react-icons/bs'
import { FaChevronDown, FaChevronUp, FaPause, FaPlay, FaStop } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { PageLayout } from '../../components'
import { useTaskContext } from '../../contexts/taskContext/taskContext'

interface TimeTrackingProps {}

function TimeTracking({}: TimeTrackingProps) {
  const { tasks } = useTaskContext()
  const [isWorking, setIsWorking] = React.useState<boolean>(false)

  function startWork() {
    setIsWorking(true)
  }

  function stopWork() {
    setIsWorking(false)
  }

  return (
    <PageLayout title='Time tracking'>
      <div className='flex gap-1'>
        <button className='button'>
          <BsPlusLg />
          Add work unit
        </button>

        {!isWorking ? (
          <Menu as='div' className='relative'>
            <Menu.Button className='button'>
              <FaPlay />
              Start work
            </Menu.Button>
            <Menu.Items
              as='ul'
              className='absolute z-50 w-max translate-y-2 rounded-md border-2 border-sky-500 bg-slate-800 p-2'
            >
              {tasks.map(({ color, name, id }) => (
                <Menu.Item key={id} as='li'>
                  <button
                    className='button w-full gap-2 px-1'
                    onClick={() => {
                      startWork()
                    }}
                  >
                    <span className={`${color} h-4 w-4 rounded-full`}></span>
                    {name}
                  </button>
                </Menu.Item>
              ))}
              <Menu.Item as='li'>
                <Link to={`/tasks/new`} className='button gap-2 px-1'>
                  <BsPlusCircle />
                  <span>Create new task</span>
                </Link>
              </Menu.Item>
            </Menu.Items>
          </Menu>
        ) : (
          <>
            <button className='button' onClick={stopWork}>
              <FaStop />
              Stop work
            </button>
            <button className='button'>
              <FaPause />
              Pause work
            </button>
          </>
        )}
      </div>
      <ul className='mt-2'>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className='flex w-full items-center gap-1 rounded-sm bg-slate-700 px-2 py-4 font-semibold'>
                {open ? <FaChevronUp /> : <FaChevronDown />}
                Sun, 2/20/2022
                <span className='ml-auto'>4 h 55 min</span>
              </Disclosure.Button>
              <Disclosure.Panel>Hello</Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </ul>
    </PageLayout>
  )
}

export default TimeTracking

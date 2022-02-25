import { Listbox } from '@headlessui/react'
import { format } from 'date-fns'
import * as React from 'react'
import { BsChevronExpand, BsPlusCircle, BsSave2 } from 'react-icons/bs'
import { FaHourglassEnd, FaHourglassStart, FaTrash } from 'react-icons/fa'
import { VscChromeClose } from 'react-icons/vsc'
import { Link } from 'react-router-dom'
import { useTaskContext } from '../../contexts/taskContext/taskContext'
import { TTask } from '../../types'
import ButtonInput from './ButtonInput'
import DatePicker from './DatePicker'
import HourPicker from './HourPicker'

interface WorkUnitEditProps {}

function WorkUnitEdit({}: WorkUnitEditProps) {
  const { tasks: allTasks } = useTaskContext()
  const [task, setTask] = React.useState<TTask>(allTasks[0])
  const [date, setDate] = React.useState<Date>(new Date())
  const [hourStart, setHourStart] = React.useState<Date>(new Date())
  const [hourEnd, setHourEnd] = React.useState<Date>(new Date())

  return (
    <form className='basis-1/3'>
      <div className='flex justify-end gap-1'>
        {true ? (
          <button className='button'>
            <FaTrash />
            Delete
          </button>
        ) : (
          <button className='button'>
            <VscChromeClose />
            Close
          </button>
        )}
        <button className='button'>
          <BsSave2 />
          Save
        </button>
      </div>

      <div className='max-w-sm space-y-1'>
        <label className='block'>
          Description
          <input type='text' className='input block' />
        </label>
        <label className='block'>
          Details
          <textarea rows={3} className='input block resize-none'></textarea>
        </label>
        <Listbox value={task} onChange={setTask} as='div' className='relative'>
          <Listbox.Label>Choose a task</Listbox.Label>
          <Listbox.Button className='flex w-full items-center justify-between rounded-md bg-slate-700 p-2'>
            <span className={`${task.color} mr-2 h-4 w-4 rounded-full`}></span>
            {task.name}
            <BsChevronExpand className='ml-auto' />
          </Listbox.Button>
          <Listbox.Options className='absolute top-0 right-0 z-50 w-max -translate-y-[90%] rounded-md border-2 border-sky-500 bg-slate-800 p-2'>
            {allTasks.map(t => (
              <Listbox.Option value={t} key={t.id}>
                {({ selected }) => (
                  <button className={`${selected ? 'bg-sky-900' : ''} button w-full gap-2 px-1`}>
                    <span className={`${t.color} h-4 w-4 rounded-full`}></span>
                    {t.name}
                  </button>
                )}
              </Listbox.Option>
            ))}
            <Listbox.Option value={undefined} as='li'>
              <Link to={`/tasks/new`} className='button gap-2 px-1'>
                <BsPlusCircle />
                <span>Create new task</span>
              </Link>
            </Listbox.Option>
          </Listbox.Options>
        </Listbox>

        <div>
          Day
          <DatePicker date={date} setDate={setDate} />
        </div>

        <div>
          Start of work
          <HourPicker
            timeCaption='Start At'
            hour={hourStart}
            setHour={setHourStart}
            customInput={
              <ButtonInput
                icon={<FaHourglassStart className='text-sky-400' />}
                text={format(new Date(hourStart), 'hh : mm aa')}
              />
            }
          />
        </div>

        <div>
          End of work
          <HourPicker
            timeCaption='End At'
            hour={hourEnd}
            setHour={setHourEnd}
            customInput={
              <ButtonInput
                icon={<FaHourglassEnd className='text-sky-400' />}
                text={format(new Date(hourEnd), 'hh : mm aa')}
              />
            }
          />
        </div>
      </div>
    </form>
  )
}

export default WorkUnitEdit

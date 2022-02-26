import { Listbox } from '@headlessui/react'
import { format } from 'date-fns'
import * as React from 'react'
import { BsChevronExpand, BsPlusCircle, BsSave2 } from 'react-icons/bs'
import { FaHourglassEnd, FaHourglassStart, FaTrash } from 'react-icons/fa'
import { VscChromeClose } from 'react-icons/vsc'
import { Link } from 'react-router-dom'
import { useTaskContext } from '../../contexts/taskContext/taskContext'
import { TTask } from '../../types'
import { DEFAULT } from '../../utils/constants/defaultValue'
import ButtonInput from './ButtonInput'
import DatePicker from './DatePicker'
import HourPicker from './HourPicker'

interface WorkUnitEditProps {}

function getNow() {
  return new Date()
}

function WorkUnitEdit({}: WorkUnitEditProps) {
  const { tasks: allTasks, getTask } = useTaskContext()

  // should store taskId instead of task to avoid duplication in state
  // https://beta.reactjs.org/learn/choosing-the-state-structure#avoid-duplication-in-state
  const [taskId, setTaskId] = React.useState<TTask['id']>(allTasks[0].id)
  const [date, setDate] = React.useState<Date>(getNow)
  const [hourStart, setHourStart] = React.useState<Date>(getNow)
  const [hourEnd, setHourEnd] = React.useState<Date>(getNow)

  const selectedTask = getTask(taskId)

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

      <div className='scrollbar h-[28rem] max-w-sm space-y-4 overflow-y-auto'>
        <label className='block'>
          Description
          <input type='text' className='input block' />
        </label>
        <label className='block'>
          Details
          <textarea rows={3} className='input block resize-none'></textarea>
        </label>
        <Listbox value={taskId} onChange={setTaskId} as='div' className='relative'>
          <Listbox.Label>Choose a task</Listbox.Label>
          <Listbox.Button className='flex w-full items-center justify-between rounded-md bg-slate-700 p-2'>
            <span className={`${selectedTask?.color} mr-2 h-4 w-4 rounded-full`}></span>
            {selectedTask?.name}
            <BsChevronExpand className='ml-auto' />
          </Listbox.Button>
          <Listbox.Options className='absolute top-0 left-0 z-50 w-max -translate-y-[85%] rounded-md border-2 border-sky-500 bg-slate-800 p-2'>
            {allTasks.map(t => (
              <Listbox.Option value={t.id} key={t.id}>
                {({ selected }) => (
                  <button className={`${selected ? 'bg-sky-900' : ''} button w-full gap-2 px-1`}>
                    <span className={`${t.color} h-4 w-4 rounded-full`}></span>
                    {t.name}
                  </button>
                )}
              </Listbox.Option>
            ))}
            <li>
              <Link to={`/tasks/new`} className='button gap-2 px-1'>
                <BsPlusCircle />
                <span>Create new task</span>
              </Link>
            </li>
          </Listbox.Options>
        </Listbox>

        <div className='relative'>
          Day
          <DatePicker date={date} setDate={setDate} />
        </div>

        <div className='relative'>
          Start of work
          <HourPicker
            timeCaption='Start At'
            hour={hourStart}
            setHour={setHourStart}
            customInput={
              <ButtonInput
                icon={<FaHourglassStart className='text-sky-400' />}
                text={format(new Date(hourStart), DEFAULT.HOUR_FORMAT)}
              />
            }
          />
        </div>

        <div className='relative'>
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

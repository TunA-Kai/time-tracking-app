import { Listbox } from '@headlessui/react'
import * as React from 'react'
import { BsArrowLeftCircle, BsCheck2, BsChevronExpand, BsSave2 } from 'react-icons/bs'
import { FaTrash } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import { useTaskContext } from '../../contexts/taskContext/taskContext'
import { colorOption } from '../../utils/constants/colorOptions'

interface TasksNewProps {
  edit?: true
}

function TasksNew({ edit }: TasksNewProps) {
  const { taskId } = useParams()
  const { addTask, getTask, deleteTask, updateTask } = useTaskContext()
  const {
    color: currentColor = 'bg-sky-400',
    name: currentName = '',
    details: currentDetail = '',
  } = getTask(Number(taskId)) ?? {}
  const [color, setColor] = React.useState<string>(currentColor)
  const [taskName, setTaskName] = React.useState<string>(currentName)
  const [taskDetail, setTaskDetail] = React.useState<string>(currentDetail)

  function handleSave() {
    const newTask = {
      id: edit ? Number(taskId) : Math.random(),
      date: new Date(),
      color,
      name: taskName,
      details: taskDetail,
    }
    edit ? updateTask(newTask) : addTask(newTask)
  }

  function handleDelete() {
    deleteTask(Number(taskId))
  }

  return (
    <form className='max-w-md space-y-4'>
      <label className='block'>
        <span className='block'>Task name</span>
        <input
          type='text'
          className='input w-full py-1 px-2'
          value={taskName}
          onChange={e => setTaskName(e.target.value)}
        />
      </label>
      <label className='block'>
        <span className='block'>Details</span>
        <textarea
          rows={7}
          className='input w-full resize-none py-1 px-2'
          value={taskDetail}
          onChange={e => setTaskDetail(e.target.value)}
        ></textarea>
      </label>
      <Listbox value={color} onChange={setColor} as='div' className='relative'>
        <Listbox.Button className='flex w-full items-center justify-between rounded-md bg-slate-700 p-2'>
          <span className={`${color} mr-2 h-6 w-6 rounded-full`}></span>
          <span>Color</span>
          <BsChevronExpand className='ml-auto' />
        </Listbox.Button>
        <Listbox.Options className='absolute bottom-12 right-0 grid grid-cols-5 gap-2 rounded-md border-2 border-sky-500 bg-slate-800 p-2 lg:-right-3 lg:bottom-1/2 lg:translate-x-full lg:translate-y-1/2'>
          {colorOption.map((c, index) => (
            <Listbox.Option key={index} value={c} as={React.Fragment}>
              {({ active, selected }) => (
                <li
                  className={`${
                    active ? 'scale-110' : ''
                  } ${c} grid h-8 w-8 place-items-center rounded-full`}
                >
                  {selected && <BsCheck2 className='stroke-1 text-2xl text-slate-900' />}
                </li>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>

      <div className='flex gap-2'>
        <Link to='..' className='button flex items-center gap-1 border-2 border-slate-700'>
          <BsArrowLeftCircle />
          Back
        </Link>

        <Link
          to='..'
          className='button flex items-center gap-1 border-2 border-slate-700'
          onClick={handleSave}
        >
          <BsSave2 />
          Save
        </Link>

        {edit && (
          <Link
            to='..'
            onClick={handleDelete}
            className='button ml-auto flex items-center gap-1 border-2 border-slate-700'
          >
            <FaTrash />
            Delete
          </Link>
        )}
      </div>
    </form>
  )
}

export default TasksNew

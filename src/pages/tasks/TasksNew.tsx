import { Listbox } from '@headlessui/react'
import * as React from 'react'
import {
  BsArrowLeftCircle,
  BsBackspace,
  BsCheck2,
  BsChevronExpand,
  BsPlusCircle,
  BsSave2,
} from 'react-icons/bs'
import { FaTrash } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import { useTaskContext } from '../../contexts/taskContext/taskContext'
import { TTag } from '../../types'
import { colorOption } from '../../utils/constants/colorOptions'
import { DEFAULT_TASK_COLOR, DEFAULT_TASK_NAME } from '../../utils/constants/defaultValue'
import { mockTags } from '../../utils/mocks/mockTags'

interface TasksNewProps {
  edit?: true
}

function TasksNew({ edit }: TasksNewProps) {
  const taskId = Number(useParams().taskId) // Number(undefined) = NaN
  const { addTask, getTask, deleteTask, updateTask, tasks } = useTaskContext()
  const {
    color: currentColor = DEFAULT_TASK_COLOR,
    name: currentName = DEFAULT_TASK_NAME,
    details: currentDetail = '',
    tags: currentTags = [],
  } = getTask(taskId) ?? {}
  const [color, setColor] = React.useState<string>(currentColor)
  const [taskName, setTaskName] = React.useState<string>(currentName)
  const [taskDetail, setTaskDetail] = React.useState<string>(currentDetail)
  const [tags, setTags] = React.useState<TTag[]>(currentTags)

  function handleSave() {
    const newTask = {
      id: edit ? taskId : tasks.length + 1,
      date: new Date(),
      color,
      name: taskName === '' ? '⚠️⚠️⚠️ Empty task name ⚠️⚠️⚠️' : taskName,
      details: taskDetail,
      tags,
    }
    edit ? updateTask(newTask) : addTask(newTask)
  }

  function handleDelete() {
    deleteTask(taskId)
  }

  function handleAddTag(tag: TTag) {
    setTags([...tags, tag])
  }
  function handleDeleteTag(e: React.MouseEvent<HTMLSpanElement>, id: number) {
    e.stopPropagation()
    setTags(tags.filter(tag => tag.id !== id))
  }

  return (
    <form className='max-w-md space-y-4'>
      <label className='block'>
        <span className='block'>Task name</span>
        <input
          type='text'
          className='input w-full py-1 px-2'
          value={taskName}
          onChange={e => setTaskName(e.currentTarget.value)}
          onFocus={e => e.currentTarget.value === DEFAULT_TASK_NAME && e.currentTarget.select()}
          autoFocus
        />
      </label>
      <label className='block'>
        <span className='block'>Details</span>
        <textarea
          rows={7}
          className='input w-full resize-none py-1 px-2'
          value={taskDetail}
          onChange={e => setTaskDetail(e.target.value)}
          placeholder='What exactly do you want to do?'
        ></textarea>
      </label>
      <Listbox value={color} onChange={setColor} as='div' className='relative'>
        <Listbox.Button className='flex w-full items-center justify-between rounded-md bg-slate-700 p-2'>
          <span className={`${color} mr-2 h-6 w-6 rounded-full`}></span>
          <span>Color</span>
          <BsChevronExpand className='ml-auto' />
        </Listbox.Button>
        <Listbox.Options className='absolute bottom-12 right-0 grid grid-cols-5 gap-2 rounded-md border-2 border-sky-500 bg-slate-800 p-2 lg:-right-3 lg:bottom-0 lg:translate-x-full '>
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

      <Listbox value={{} as TTag} onChange={handleAddTag} as='div' className='relative'>
        <Listbox.Button className='flex w-full items-center justify-between rounded-md bg-slate-700 p-2'>
          <ul className='flex gap-1'>
            {tags.length === 0 ? (
              <li>Pick a tag</li>
            ) : (
              tags.map(t => (
                <li
                  key={t.id}
                  className={`${t.color} flex items-center gap-1 rounded-sm px-1 text-slate-900`}
                >
                  {t.name}
                  <span onClick={e => handleDeleteTag(e, t.id)}>
                    <BsBackspace />
                  </span>
                </li>
              ))
            )}
          </ul>
          <BsChevronExpand className='ml-auto' />
        </Listbox.Button>
        <Listbox.Options className='absolute bottom-12 right-0 grid grid-cols-1 rounded-md border-2 border-sky-500 bg-slate-800 lg:-right-3 lg:bottom-0 lg:translate-x-full '>
          {mockTags.map(t =>
            tags.includes(t) ? undefined : (
              <Listbox.Option key={t.id} value={t} className='button gap-1'>
                <span className={`${t.color} h-4 w-4 rounded-full`}></span>
                {t.name}
              </Listbox.Option>
            ),
          )}
          <Listbox.Option value={undefined}>
            <Link to='/tags/new' className='button gap-1'>
              <BsPlusCircle />
              <span>Create new tag</span>
            </Link>
          </Listbox.Option>
        </Listbox.Options>
      </Listbox>

      <div className='flex gap-2'>
        <Link to='..' className='button border-2 border-slate-700'>
          <BsArrowLeftCircle />
          Back
        </Link>

        <Link to='..' className='button border-2 border-slate-700' onClick={handleSave}>
          <BsSave2 />
          Save
        </Link>

        {edit && (
          <Link to='..' onClick={handleDelete} className='button ml-auto border-2 border-slate-700'>
            <FaTrash />
            Delete
          </Link>
        )}
      </div>
    </form>
  )
}

export default TasksNew

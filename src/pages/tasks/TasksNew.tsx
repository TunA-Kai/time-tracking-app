import * as React from 'react'
import { BsArrowLeftCircle, BsSave2 } from 'react-icons/bs'
import { FaTrash } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import { ColorPicker, ItemPicker } from '../../components'
import { useTaskContext } from '../../contexts/taskContext/taskContext'
import { TTag } from '../../types'
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
  function handleDeleteTag(e: React.MouseEvent, id: number) {
    e.stopPropagation()
    setTags(tags.filter(tag => tag.id !== id))
  }

  return (
    <form className='max-w-md space-y-4'>
      <label className='block'>
        <span className='block'>Task name</span>
        <input
          type='text'
          className='input w-full'
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
          className='input w-full resize-none'
          value={taskDetail}
          onChange={e => setTaskDetail(e.target.value)}
          placeholder='What exactly do you want to do?'
        ></textarea>
      </label>

      <ColorPicker color={color} setColor={setColor} />

      <ItemPicker
        type='tag'
        allItemList={mockTags}
        pickedItemList={tags}
        onChange={handleAddTag}
        onDelete={handleDeleteTag}
      />

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

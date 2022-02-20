import { deleteDoc, doc, setDoc, Timestamp } from 'firebase/firestore'
import * as React from 'react'
import { BsArrowLeftCircle, BsSave2 } from 'react-icons/bs'
import { FaTrash } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { ColorPicker, ItemPicker } from '../../components'
import { useTagContext } from '../../contexts/tagContext/tagContext'
import { useTaskContext } from '../../contexts/taskContext/taskContext'
import { db } from '../../firebaseConfig'
import { TTask } from '../../types'
import { DEFAULT_TASK_COLOR, DEFAULT_TASK_NAME } from '../../utils/constants/defaultValue'

interface TasksNewProps {
  edit?: true
}

function TasksNew({ edit }: TasksNewProps) {
  const { tags } = useTagContext()
  const { taskId } = useParams()
  const { getTask, updateTask, addTask, deleteTask } = useTaskContext()
  const {
    color: currentColor = DEFAULT_TASK_COLOR,
    name: currentName = DEFAULT_TASK_NAME,
    details: currentDetail = '',
    tagIds: currentTags = [],
  } = taskId ? getTask(taskId) ?? {} : {}
  const [color, setColor] = React.useState<string>(currentColor)
  const [taskName, setTaskName] = React.useState<string>(currentName)
  const [taskDetail, setTaskDetail] = React.useState<string>(currentDetail)
  const [tagIds, setTagIds] = React.useState<string[]>(currentTags)

  function handleSave() {
    const newTask = {
      id: taskId ? taskId : uuidv4(),
      date: Timestamp.now(),
      color,
      name: taskName === '' ? '⚠️⚠️⚠️ Empty task name ⚠️⚠️⚠️' : taskName,
      details: taskDetail,
      tagIds,
    }

    setDoc(doc(db, 'tasks', newTask.id), newTask)
    edit ? updateTask(newTask) : addTask(newTask)
  }

  function handleDelete() {
    if (taskId) {
      deleteDoc(doc(db, 'tasks', taskId))
      deleteTask(taskId)
    }
  }

  // useCallback here because it is in the dependency list in Listbox component
  const handleAddTag = React.useCallback(function handleAddTag(tagId: string) {
    setTagIds(oldTagIds => [...oldTagIds, tagId])
  }, [])
  function handleDeleteTag(e: React.MouseEvent, id: string) {
    e.stopPropagation()
    setTagIds(tagIds.filter(tagId => tagId !== id))
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
        allItemList={tags}
        pickedItemList={tags.filter(t => tagIds.includes(t.id))}
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

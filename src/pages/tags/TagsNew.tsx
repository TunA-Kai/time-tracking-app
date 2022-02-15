import * as React from 'react'
import { BsArrowLeftCircle, BsSave2 } from 'react-icons/bs'
import { FaTrash } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import { ColorPicker, ItemPicker } from '../../components'
import { useTagContext } from '../../contexts/tagContext/tagContext'
import { TTask } from '../../types'
import { DEFAULT_TAG_COLOR, DEFAULT_TAG_NAME } from '../../utils/constants/defaultValue'
import { mockTasks } from '../../utils/mocks/mockTasks'

interface TagsNewProps {
  edit?: true
}

function TagsNew({ edit }: TagsNewProps) {
  const tagId = Number(useParams().tagId) // Number(undefined) = NaN
  const { addTag, getTag, deleteTag, updateTag, tags } = useTagContext()
  const {
    color: currentColor = DEFAULT_TAG_COLOR,
    name: currentName = DEFAULT_TAG_NAME,
    details: currentDetail = '',
    tasks: currentTasks = [],
  } = getTag(tagId) ?? {}
  const [color, setColor] = React.useState<string>(currentColor)
  const [tagName, setTagName] = React.useState<string>(currentName)
  const [tagDetail, setTagDetail] = React.useState<string>(currentDetail)
  const [tasks, setTasks] = React.useState<TTask[]>(currentTasks)

  function handleSave() {
    const newTag = {
      id: edit ? tagId : tags.length + 1,
      date: new Date(),
      color,
      name: tagName === '' ? '⚠️⚠️⚠️ Empty tag name ⚠️⚠️⚠️' : tagName,
      details: tagDetail,
      tasks,
    }
    edit ? updateTag(newTag) : addTag(newTag)
  }

  function handleDelete() {
    deleteTag(tagId)
  }

  // useCallback here because it is in the dependency list in Listbox component
  const handleAddTask = React.useCallback(function handleAddTask(task: TTask) {
    setTasks(oldTasks => [...oldTasks, task])
  }, [])
  function handleDeleteTask(e: React.MouseEvent, id: number) {
    e.stopPropagation()
    setTasks(tasks.filter(task => task.id !== id))
  }

  return (
    <form className='max-w-md space-y-4'>
      <label className='block'>
        <span className='block'>Tag name</span>
        <input
          type='text'
          className='input w-full'
          value={tagName}
          onChange={e => setTagName(e.currentTarget.value)}
          onFocus={e => e.currentTarget.value === DEFAULT_TAG_NAME && e.currentTarget.select()}
          autoFocus
        />
      </label>
      <label className='block'>
        <span className='block'>Details</span>
        <textarea
          rows={7}
          className='input w-full resize-none'
          value={tagDetail}
          onChange={e => setTagDetail(e.target.value)}
          placeholder='What exactly do you want to do?'
        ></textarea>
      </label>

      <ColorPicker color={color} setColor={setColor} />

      <ItemPicker
        type='task'
        allItemList={mockTasks}
        pickedItemList={tasks}
        onChange={handleAddTask}
        onDelete={handleDeleteTask}
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

export default TagsNew

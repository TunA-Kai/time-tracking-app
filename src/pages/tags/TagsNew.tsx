import { deleteDoc, doc, setDoc, Timestamp } from 'firebase/firestore'
import * as React from 'react'
import { BsArrowLeftCircle, BsSave2 } from 'react-icons/bs'
import { FaTrash } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { ColorPicker } from '../../components'
import { useTagContext } from '../../contexts/tagContext/tagContext'
import { useTaskContext } from '../../contexts/taskContext/taskContext'
import { db } from '../../firebaseConfig'
import { DEFAULT_TAG_COLOR, DEFAULT_TAG_NAME } from '../../utils/constants/defaultValue'

interface TagsNewProps {
  edit?: true
}

function TagsNew({ edit }: TagsNewProps) {
  const { tasks } = useTaskContext()
  const { tagId } = useParams()
  const { getTag, updateTag, deleteTag, addTag } = useTagContext()
  const {
    color: currentColor = DEFAULT_TAG_COLOR,
    name: currentName = DEFAULT_TAG_NAME,
    details: currentDetail = '',
  } = tagId ? getTag(tagId) ?? {} : {}
  const [color, setColor] = React.useState<string>(currentColor)
  const [tagName, setTagName] = React.useState<string>(currentName)
  const [tagDetail, setTagDetail] = React.useState<string>(currentDetail)

  function handleSave() {
    const newTag = {
      id: tagId ? tagId : uuidv4(),
      date: Timestamp.now(),
      color,
      name: tagName === '' ? '⚠️⚠️⚠️ Empty tag name ⚠️⚠️⚠️' : tagName,
      details: tagDetail,
    }
    newTag.id && setDoc(doc(db, 'tags', newTag.id), newTag)
    edit ? updateTag(newTag) : addTag(newTag)
  }

  function handleDelete() {
    if (tagId) {
      deleteDoc(doc(db, 'tags', tagId))
      deleteTag(tagId)
    }
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

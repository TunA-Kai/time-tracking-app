import { Disclosure } from '@headlessui/react'
import { AiOutlineTag } from 'react-icons/ai'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { LabelTag } from '../../components'
import { useTagContext } from '../../contexts/tagContext/tagContext'
import { useTaskContext } from '../../contexts/taskContext/taskContext'
import { TWorkUnit } from '../../types'
import { secondToHour } from '../../utils/helpers/secondToHour'

interface NormalDateBlockProps {
  date: string
  workUnits: TWorkUnit[]
}

function NormalDateBlock({ date, workUnits }: NormalDateBlockProps) {
  const { tasks } = useTaskContext()
  const { tags } = useTagContext()
  const totalWorkDuration = secondToHour(workUnits.reduce((a, b) => a + (b.duration ?? 0), 0))
  return (
    <Disclosure as='li'>
      {({ open }) => (
        <>
          <Disclosure.Button className='flex w-full items-center gap-1 rounded-sm bg-slate-700 px-2 py-4 font-semibold'>
            {open ? <FaChevronUp /> : <FaChevronDown />}
            {date}
            <span className='ml-auto'>{totalWorkDuration}</span>
          </Disclosure.Button>
          <Disclosure.Panel>
            {workUnits.map(wku => {
              const task = tasks.find(t => t.id === wku.taskId)
              const activeTags = tags.filter(t => task?.tagIds.includes(t.id))
              return (
                <div key={wku.id} className='relative mt-1 bg-slate-800 py-2 px-3'>
                  <div
                    className={`${task?.color} absolute left-0 top-0 h-full w-1 rounded-l rounded-r`}
                  ></div>
                  {task?.name}
                  <div className='flex gap-1'>
                    {activeTags.map(
                      tag =>
                        tag && (
                          <LabelTag key={tag.id} as='div' additionStyles={`${tag.color} mt-1`}>
                            <AiOutlineTag />
                            {tag.name}
                          </LabelTag>
                        ),
                    )}
                  </div>
                  <div className='absolute right-2 top-0 flex h-full items-center gap-1'>
                    {secondToHour(wku.duration ?? 0)}
                  </div>
                </div>
              )
            })}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default NormalDateBlock

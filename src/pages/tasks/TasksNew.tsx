import { Listbox } from '@headlessui/react'
import * as React from 'react'
import { BsCheck2, BsChevronExpand } from 'react-icons/bs'
import { colorOption } from '../../utils/constants/colorOptions'

interface TasksNewProps {}

function TasksNew({}: TasksNewProps) {
  const [color, setColor] = React.useState<string>('bg-sky-400')
  return (
    <div className='max-w-md space-y-4'>
      <label className='block'>
        <span className='block'>Task name</span>
        <input type='text' className='input w-full py-1 px-2' />
      </label>
      <label className='block'>
        <span className='block'>Details</span>
        <textarea rows={7} className='input w-full resize-none py-1 px-2'></textarea>
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
    </div>
  )
}

export default TasksNew

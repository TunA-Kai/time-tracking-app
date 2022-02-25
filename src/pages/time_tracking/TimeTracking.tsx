import { Menu } from '@headlessui/react'
import { doc, setDoc, Timestamp } from 'firebase/firestore'
import * as React from 'react'
import { BsPlusCircle, BsPlusLg } from 'react-icons/bs'
import { FaPause, FaPlay, FaStop } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { PageLayout } from '../../components'
import { useTaskContext } from '../../contexts/taskContext/taskContext'
import { useWorkUnitContext } from '../../contexts/workUnitContext/workUnitContext'
import { db } from '../../firebaseConfig'
import { FireStoreCollection, TWorkUnit } from '../../types'
import { DEFAULT_EDIT_WORKUNIT_ID } from '../../utils/constants/defaultValue'
import { formatDate } from '../../utils/helpers/formatDate'
import FirstDateBlock from './FirstDateBlock'
import NormalDateBlock from './NormalDateBlock'
import WorkUnitEdit from './WorkUnitEdit'

function TimeTracking() {
  const { tasks } = useTaskContext()
  const {
    workUnits: collection,
    setWorkUnits: setCollection,
    timerRef,
    workStatus,
    setWorkStatus,
  } = useWorkUnitContext()
  const [editId, setEditId] = React.useState<string | undefined>(undefined)

  const workUnits = React.useMemo(
    () =>
      collection.reduce((final, current) => {
        const { date } = current
        if (date in final) final[date].push(current)
        else final[date] = [current]
        return final
      }, {} as Record<string, TWorkUnit[]>),
    [collection],
  )

  // form of key: Tue, 02/22/2022
  const dateKeys = React.useMemo(
    () =>
      Object.keys(workUnits).sort((d1, d2) => {
        const getNumeric = (key: string) =>
          key.split(', ')[1].replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3/$1/$2')
        if (getNumeric(d1) < getNumeric(d2)) return 1
        else return -1
      }),
    [workUnits],
  )

  const isWorking = workStatus === 'working'
  const isPause = workStatus === 'pause'
  const isIdle = workStatus === 'idle'

  function startWork() {
    setWorkStatus('working')
    timerRef.current = 0
  }

  function pauseWork() {
    setWorkStatus('pause')
  }

  function continueWork() {
    setWorkStatus('working')
  }

  function stopWork() {
    const newWorkUnit = { ...collection[0], end: Timestamp.now(), duration: timerRef.current }
    setWorkStatus('idle')
    setDoc(doc(db, FireStoreCollection.WORKUNIT, newWorkUnit.id), newWorkUnit)
    setCollection([newWorkUnit, ...collection.slice(1)])
  }

  function addWorkUnit(taskId: string) {
    const date = formatDate(new Date())
    startWork()
    const newWorkUnit = {
      id: uuidv4(),
      date,
      taskId,
      start: Timestamp.now(),
      end: Timestamp.now(),
    }
    setCollection([newWorkUnit, ...collection])
  }

  return (
    <PageLayout title='Time tracking'>
      <div className='flex gap-4'>
        <div className='grow'>
          <div className='flex gap-1'>
            <button className='button' onClick={() => setEditId(DEFAULT_EDIT_WORKUNIT_ID)}>
              <BsPlusLg />
              Add work unit
            </button>

            {isIdle ? (
              <Menu as='div' className='relative'>
                <Menu.Button className='button'>
                  <FaPlay />
                  Start work
                </Menu.Button>
                <Menu.Items
                  as='ul'
                  className='absolute z-50 w-max translate-y-2 rounded-md border-2 border-sky-500 bg-slate-800 p-2'
                >
                  {tasks.map(({ color, name, id }) => (
                    <Menu.Item key={id} as='li'>
                      <button className='button w-full gap-2 px-1' onClick={() => addWorkUnit(id)}>
                        <span className={`${color} h-4 w-4 rounded-full`}></span>
                        {name}
                      </button>
                    </Menu.Item>
                  ))}
                  <Menu.Item as='li'>
                    <Link to={`/tasks/new`} className='button gap-2 px-1'>
                      <BsPlusCircle />
                      <span>Create new task</span>
                    </Link>
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            ) : (
              <>
                <button className='button' onClick={stopWork}>
                  <FaStop />
                  Stop work
                </button>
                {isPause ? (
                  <button className='button' onClick={continueWork}>
                    <FaPlay />
                    Continue work
                  </button>
                ) : (
                  <button className='button' onClick={pauseWork}>
                    <FaPause />
                    Pause work
                  </button>
                )}
              </>
            )}
          </div>

          <ul className='mt-2 space-y-1'>
            {dateKeys.length > 0 && (
              <>
                {dateKeys[0] === formatDate(new Date()) ? (
                  <FirstDateBlock
                    date={dateKeys[0]}
                    workUnits={workUnits[dateKeys[0]]}
                    isWorking={isWorking}
                    isIdle={isIdle}
                    timerRef={timerRef}
                  />
                ) : (
                  <NormalDateBlock date={dateKeys[0]} workUnits={workUnits[dateKeys[0]]} />
                )}
                {dateKeys.slice(1).map(date => (
                  <NormalDateBlock key={date} date={date} workUnits={workUnits[date]} />
                ))}
              </>
            )}
          </ul>
        </div>
        {editId && <WorkUnitEdit />}
      </div>
    </PageLayout>
  )
}

export default TimeTracking

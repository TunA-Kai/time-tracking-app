import { Popover } from '@headlessui/react'
import * as React from 'react'
import { BsQuestionLg } from 'react-icons/bs'
import { VscPlay, VscSettings } from 'react-icons/vsc'
import { PageLayout } from '../../components'
import useCounter from '../../utils/hooks/useCounter'
import ConfigTimerButton from './ConfigTimerButton'
import ConfigTimerSwitch from './ConfigTimerSwitch'
import Timer from './Timer'

interface PomodoroProps {}

function Pomodoro({}: PomodoroProps) {
  const [pomodoroCount, incPomodoroCount, decpomodoroCount] = useCounter({
    initialValue: 4,
    maxValue: 8,
    minValue: 1,
  })
  const [pomodoroDuration, incPomodoroDuration, decPomodoroDuration] = useCounter({
    initialValue: 25,
    maxValue: 50,
    minValue: 1,
  })
  const [breakDuration, incBreakDuration, decBreakDuration] = useCounter({
    initialValue: 5,
    maxValue: 15,
    minValue: 1,
  })
  const [auto, setAuto] = React.useState<boolean>(false)
  const [sound, setSound] = React.useState<boolean>(false)
  const [sync, setSync] = React.useState<boolean>(false)

  return (
    <PageLayout title='Pomodoro'>
      <div className='flex h-[calc(100vh-theme(space.24))] flex-col gap-4'>
        <div className='grid grow place-items-center'>
          <Timer />
          <button className='-mt-20 rounded-full bg-slate-800 p-2 hover:bg-slate-700'>
            <VscPlay className='h-7 w-7 translate-x-[2px]' />
          </button>
          <div className='-mt-4 flex flex-wrap justify-center gap-2'>
            <div className='h-1 w-16 rounded-sm bg-slate-700'></div>
            <div className='h-1 w-4 rounded-sm bg-slate-700'></div>
            <div className='h-1 w-16 rounded-sm bg-slate-700'></div>
            <div className='h-1 w-4 rounded-sm bg-slate-700'></div>
            <div className='h-1 w-16 rounded-sm bg-slate-700'></div>
            <div className='h-1 w-4 rounded-sm bg-slate-700'></div>
            <div className='h-1 w-16 rounded-sm bg-slate-700'></div>
          </div>
        </div>

        <div className='flex justify-between'>
          <a
            href='https://en.wikipedia.org/wiki/Pomodoro_Technique'
            target='_blank'
            rel='noreferrer'
            className='button border border-slate-600'
          >
            <BsQuestionLg className='h-5 w-5' />
          </a>
          <Popover className='relative'>
            <Popover.Button className='button border border-slate-600'>
              <VscSettings className='h-5 w-5' />
            </Popover.Button>
            <Popover.Panel
              // static
              className='absolute right-0 bottom-0 -translate-y-11 space-y-4 rounded-md bg-slate-800 p-4 text-sm'
            >
              <div>
                Pomodoro duration
                <ConfigTimerButton
                  text={`${pomodoroDuration} min`}
                  increment={incPomodoroDuration}
                  decrement={decPomodoroDuration}
                />
              </div>
              <div>
                Break duration
                <ConfigTimerButton
                  text={`${breakDuration} min`}
                  increment={incBreakDuration}
                  decrement={decBreakDuration}
                />
              </div>
              <div>
                Pomodoro count{' '}
                <ConfigTimerButton
                  text={String(pomodoroCount)}
                  increment={incPomodoroCount}
                  decrement={decpomodoroCount}
                />
              </div>
              <ConfigTimerSwitch
                label='Auto start pomodoros & breaks'
                checked={auto}
                onChange={setAuto}
              />
              <ConfigTimerSwitch label='Notification sound' checked={sound} onChange={setSound} />
              <ConfigTimerSwitch
                label='Sync with time tracking'
                checked={sync}
                onChange={setSync}
              />
            </Popover.Panel>
          </Popover>
        </div>
      </div>
    </PageLayout>
  )
}

export default Pomodoro

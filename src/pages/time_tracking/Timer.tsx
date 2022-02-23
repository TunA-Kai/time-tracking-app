import * as React from 'react'
import { secondToHour } from '../../utils/helpers/secondToHour'
import { useInterval } from '../../utils/hooks/useInterval'

interface TimerProps {
  currentSecond: number
  timerRef?: React.MutableRefObject<number>
  isWorking: boolean
}

function Timer({ currentSecond, timerRef, isWorking }: TimerProps) {
  const [second, setSecond] = React.useState(currentSecond)
  function interval() {
    setSecond(s => s + 1)
    timerRef && timerRef.current++
  }

  second % 60 === 0 && console.log(second)

  useInterval(interval, isWorking ? 1000 : null)

  return <>{secondToHour(second)}</>
}

export default Timer

import * as React from 'react'
import ReactDatePicker from 'react-datepicker'
import { SetValue } from '../../types'

interface HourPickerProps {
  customInput: React.ReactNode
  timeCaption: string
  hour: Date
  setHour: SetValue<Date>
}

function HourPicker({ customInput, hour, setHour, timeCaption }: HourPickerProps) {
  return (
    <ReactDatePicker
      selected={hour}
      onChange={hour => setHour(hour ?? new Date())}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      timeCaption={timeCaption}
      popperPlacement='top-start'
      customInput={customInput}
    />
  )
}

export default HourPicker

import { format } from 'date-fns'
import * as React from 'react'
import ReactDatePicker from 'react-datepicker'
import { BsCalendar2CheckFill } from 'react-icons/bs'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { SetValue } from '../../types'
import ButtonInput from './ButtonInput'

interface DatePickerProps {
  date: Date
  setDate: SetValue<Date>
}

function DatePicker({ date, setDate }: DatePickerProps) {
  return (
    <ReactDatePicker
      selected={date}
      onChange={date => setDate(date ?? new Date())}
      customInput={
        <ButtonInput
          icon={<BsCalendar2CheckFill className='text-sky-400' />}
          text={format(new Date(date), 'EEE, LL/dd/yyyy')}
        />
      }
      popperPlacement='top-start'
      renderCustomHeader={({
        date,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div className='flex items-center justify-between px-2 py-2'>
          <span className='text-lg'>{format(date, 'MMMM yyyy')}</span>

          <div className='flex gap-2'>
            <button
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
              type='button'
              className={`${prevMonthButtonDisabled && 'cursor-not-allowed opacity-50'} button`}
            >
              <FaChevronLeft className='h-5 w-5' />
            </button>

            <button
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
              type='button'
              className={`${nextMonthButtonDisabled && 'cursor-not-allowed opacity-50'} button`}
            >
              <FaChevronRight className='h-5 w-5' />
            </button>
          </div>
        </div>
      )}
    />
  )
}

export default DatePicker

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  ChartDataset,
  ChartOptions,
  Legend,
  LinearScale,
  Tooltip,
} from 'chart.js'
import { eachDayOfInterval, endOfMonth, format, secondsToHours, startOfMonth } from 'date-fns'
import * as React from 'react'
import { Bar } from 'react-chartjs-2'
import ReactDatePicker from 'react-datepicker'
import { AiOutlineTags } from 'react-icons/ai'
import { BsFillBarChartFill } from 'react-icons/bs'
import { FaChartLine, FaChevronLeft, FaChevronRight, FaTasks } from 'react-icons/fa'
import { ButtonInput, PageLayout } from '../../components'
import { useTaskContext } from '../../contexts/taskContext/taskContext'
import { useWorkUnitContext } from '../../contexts/workUnitContext/workUnitContext'
import type { DateString, TWorkUnit } from '../../types'
import { colorOption } from '../../utils/constants/colorOptions'
import { DEFAULT } from '../../utils/constants/defaultValue'
import { secondToHour } from '../../utils/helpers/secondToHour'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

const options: ChartOptions<'bar'> = {
  maintainAspectRatio: false,
  responsive: true,
  resizeDelay: 500,
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        color: '#f8fafc',
        boxHeight: 16,
        boxWidth: 16,
        font: { family: 'Poppins' },
        usePointStyle: true,
      },
    },
    tooltip: {
      position: 'nearest',
      xAlign: 'center',
      yAlign: 'bottom',
      borderColor: '#0ea5e9',
      borderWidth: 2,
      backgroundColor: '#0f172a',
      usePointStyle: true,
      boxPadding: 2,
      callbacks: {
        label: items => {
          // console.log(items)
          // items.dataset.label looks like 'Tag 1: total time' --> get 'Tag 1'
          return `${items.dataset.label?.split(':')[0]}: ${secondToHour(items.raw as number)}`
        },
      },
    },
  },
  scales: {
    x: {
      stacked: true,
      ticks: {
        color: '#f8fafc', // slate-50
        font: {
          family: 'Poppins',
          size: 9,
        },
      },
      grid: {
        color: '#475569', // slate-600
      },
    },
    y: {
      stacked: true,
      ticks: {
        callback: (value, index, ticks) => {
          return index === 0 ? '' : secondToHour(value as number).slice(0, -3)
        },
        color: '#f8fafc', // slate-50
        // stepSize: 3600,
        font: {
          family: 'Poppins',
          size: 10,
        },
      },
      grid: {
        color: '#475569', // slate-600
      },
    },
  },
}

function Analytics() {
  const [month, setMonth] = React.useState<Date>(new Date(2022, 1, 1))
  const { groupedWorkUnits } = useWorkUnitContext()
  const { tasks } = useTaskContext()

  const dayInterval = React.useMemo(
    () => eachDayOfInterval({ start: startOfMonth(month), end: endOfMonth(month) }),
    [month],
  )
  const labels = dayInterval.map(d => format(d, 'MMM d'))

  const groupedWkuTaskTime = React.useMemo(
    () =>
      Object.keys(groupedWorkUnits).reduce((acc, key) => {
        acc[key] = groupedWorkUnits[key].reduce((objWithTaskTime, wku) => {
          objWithTaskTime[wku.taskId] = (objWithTaskTime[wku.taskId] ?? 0) + (wku.duration ?? 0)
          return objWithTaskTime
        }, {} as Record<TWorkUnit['taskId'], number>)
        return acc
      }, {} as Record<DateString, Record<TWorkUnit['taskId'], number>>),
    [groupedWorkUnits],
  )

  const datasets = React.useMemo(
    () =>
      tasks.reduce((acc, t) => {
        const data = dayInterval.map(
          day => groupedWkuTaskTime[format(day, DEFAULT.DATE_FORMAT)]?.[t.id] ?? 0,
        )
        const totalTime = data.reduce((a, b) => a + b)

        if (totalTime === 0) return acc

        const dataset = {
          label: `${t.name}: ${secondToHour(totalTime)}`,
          data,
          backgroundColor: colorOption[t.color],
        }
        acc.push(dataset)
        return acc
      }, [] as ChartDataset<'bar', number[]>[]),
    [dayInterval, groupedWkuTaskTime, tasks],
  )

  const data: ChartData<'bar', number[], string> = {
    labels,
    datasets,
  }

  return (
    <PageLayout title='Analytics'>
      <div className='mx-auto -mt-5 mb-5 flex max-w-xl gap-4'>
        <div>
          <button className='button w-20 rounded-r-none border border-slate-700 p-1'>
            <FaChartLine />
            Lines
          </button>
          <button className='button w-20 rounded-l-none border border-slate-700 p-1'>
            <BsFillBarChartFill />
            Bars
          </button>
        </div>
        <div>
          <button className='button w-20 rounded-r-none border border-slate-700 p-1'>
            <FaTasks />
            Tasks
          </button>
          <button className='button w-20 rounded-l-none border border-slate-700 p-1'>
            <AiOutlineTags />
            Tags
          </button>
        </div>

        <div className='relative'>
          <ReactDatePicker
            selected={month}
            onChange={date => setMonth(date ?? new Date())}
            showMonthYearPicker
            customInput={
              <ButtonInput icon={<></>} text={format(month, 'MMM yyyy')} additionalStyles='py-1' />
            }
            renderCustomHeader={({ date, decreaseYear, increaseYear }) => (
              <div className='flex items-center justify-between gap-2'>
                <button onClick={decreaseYear} type='button' className='button'>
                  <FaChevronLeft className='h-5 w-5' />
                </button>
                <span className='text-lg'>{format(date, 'yyyy')}</span>
                <button onClick={increaseYear} type='button' className='button'>
                  <FaChevronRight className='h-5 w-5' />
                </button>
              </div>
            )}
          />
        </div>
      </div>
      <div className='relative mx-auto h-[80vh] w-[85vw] lg:w-[75vw]'>
        <Bar options={options} data={data} />
      </div>
    </PageLayout>
  )
}

export default Analytics

/*
  > workUnits = {[key: date string]: wku[]}
    wkuArray.map(wku => { 
      tags = getTask(wku.taskId).tags
      a = {}
      tags.forEach(t => a[t] = wku.duration/tags.length) 
      return a
    }).reduce((acc, item) => {
      for (const tagId in item) {
        acc[tagId] = (acc[tagId] ?? 0) + item[tagId]
      }
      return acc
    }, {})

    [key: date string]: {[key: tagId]: duration}[]

  > datasets = tags.reduce((dataset, tag) => {
    + caculate total for this tag
    + if have data => create object
        data: dayInterval.map(day => workUnits[format(day)] ? thatArray.reduce((total, wku) => {
            total + getTask(taskId)?.tags.includes(tag) ? wku.duration / thatTask.tags.length : 0
          }, 0) : 0)
        totalTime = data.reduce((a,b) => a + b)
        if totalTime === 0 return dataset
        newDataSet = {
          label: tag.name: totalTime
          data
          backgroundColor: colorOption[tag.color]
        }
        return [...dataset, newDataSet]
  }, [])
*/

/*
  data: dayInterval.map(day => workUnits[format(day)] ? workUnits[format(day)][taskId] : 0)
  The problem is for each task of allTasks I have to reduce that array again
  --> restructure that Array to an obj {[key: taskId]: duration}
  wkuArray.reduce((acc, wku) => {
    acc[wku.taskId] = (acc[wku.taskId] ?? 0) + wku.duration
    return acc
  }, {})

  > datasets = tasks.
*/

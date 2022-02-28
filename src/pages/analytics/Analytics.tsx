import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  LinearScale,
  Legend,
  Tooltip,
} from 'chart.js'
import { eachDayOfInterval, format, secondsToHours } from 'date-fns'
import { Bar } from 'react-chartjs-2'
import { PageLayout } from '../../components'
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
          return index === 0 ? '' : secondsToHours(value as number) + ' h'
        },
        color: '#f8fafc', // slate-50
        stepSize: 3600,
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

const dayInterval = eachDayOfInterval({ start: new Date(2022, 1, 1), end: new Date(2022, 1, 28) })
const labels = dayInterval.map(d => format(d, 'MMM d'))

const data: ChartData<'bar', number[], string> = {
  labels,
  datasets: [
    {
      label: 'Tag 1: total time',
      data: Array.from({ length: 28 }, () => Math.floor(Math.random() * 4 * 3600)),
      backgroundColor: '#f87171',
    },
    {
      label: 'Tag 2: total time',
      data: Array.from({ length: 28 }, () => Math.floor(Math.random() * 4 * 3600)),
      backgroundColor: '#a78bfa',
    },
    {
      label: 'Tag 3: total time',
      data: Array.from({ length: 28 }, () => Math.floor(Math.random() * 4 * 3600)),
      backgroundColor: 'rgb(53, 162, 235)',
    },
  ],
}

function Analytics() {
  return (
    <PageLayout title='Analytics'>
      <div>Options</div>
      <div className='relative mx-auto h-[80vh] w-[85vw] lg:w-[75vw]'>
        <Bar options={options} data={data} />
      </div>
    </PageLayout>
  )
}

export default Analytics

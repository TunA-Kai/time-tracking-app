import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components'
import {
  About,
  Analytics,
  Error,
  Pomodoro,
  Settings,
  Tags,
  Tasks,
  TasksHome,
  TasksNew,
  TimeTracking,
} from './pages'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route index element={<Navigate to='/time_tracking' />} />
          <Route path='time_tracking' element={<TimeTracking />} />
          <Route path='tasks' element={<Tasks />}>
            <Route index element={<TasksHome />} />
            <Route path='new' element={<TasksNew />} />
            <Route path='edit/:taskId' element={<TasksNew edit />} />
          </Route>
          <Route path='tags' element={<Tags />} />
          <Route path='analytics' element={<Analytics />} />
          <Route path='pomodoro' element={<Pomodoro />} />
          <Route path='about' element={<About />} />
          <Route path='settings' element={<Settings />} />
          <Route path='*' element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

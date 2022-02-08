import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components'
import { About, Analytics, Error, Pomodoro, Settings, Tags, Tasks, TimeTracking } from './pages'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route index element={<TimeTracking />} />
          <Route path='time_tracking' element={<TimeTracking />} />
          <Route path='tasks' element={<Tasks />} />
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

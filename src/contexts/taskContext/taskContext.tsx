import * as React from 'react'
import { mockTasks } from '../../mocks/mockTasks'

interface TTask {
  id: number
  date: Date
  name: string
  details: string
  color: string
}

interface TaskContextType {
  tasks: TTask[]
  setTasks: React.Dispatch<React.SetStateAction<TTask[]>>
}

const TaskContext = React.createContext<TaskContextType | undefined>(undefined)

function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = React.useState<TTask[]>(mockTasks)
  const contextValue = { tasks, setTasks }
  return <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
}

function useTaskContext() {
  const context = React.useContext(TaskContext)
  if (context === undefined) throw new Error('useTaskContext must be used within a TaskProvider')
  const { tasks, setTasks } = context
  function addTask(newTask: TTask) {
    setTasks([...tasks, newTask])
  }
  function deleteTask(taskId: number) {
    setTasks(tasks.filter(t => t.id !== taskId))
  }
  function updateTask(newTask: TTask) {
    const newTasks = tasks.filter(t => t.id !== newTask.id)
    setTasks([...newTasks, newTask])
  }
  function getTask(taskId: number) {
    return tasks.find(t => t.id === taskId)
  }
  return { tasks, addTask, deleteTask, updateTask, getTask }
}

export { TaskProvider, useTaskContext }

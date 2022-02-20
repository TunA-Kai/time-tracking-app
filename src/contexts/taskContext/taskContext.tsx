import { getDocs } from 'firebase/firestore'
import * as React from 'react'
import { tasksColRef } from '../../firebaseConfig'
import { SetValue, TTask } from '../../types'

interface TaskContextType {
  tasks: TTask[]
  setTasks: SetValue<TTask[]>
}

const TaskContext = React.createContext<TaskContextType | undefined>(undefined)

function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = React.useState<TTask[]>([])
  const contextValue = { tasks, setTasks }

  React.useEffect(() => {
    async function getTasks() {
      const snapshot = await getDocs(tasksColRef)
      const tasks: TTask[] = []
      snapshot.forEach(doc => tasks.push(doc.data() as TTask))
      setTasks(tasks)
      console.log(tasks)
    }
    getTasks()
  }, [])

  return <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
}

function useTaskContext() {
  const context = React.useContext(TaskContext)
  if (context === undefined) throw new Error('useTaskContext must be used within a TaskProvider')
  const { tasks, setTasks } = context
  function addTask(newTask: TTask) {
    setTasks([...tasks, newTask])
  }
  function deleteTask(taskId: string) {
    setTasks(tasks.filter(t => t.id !== taskId))
  }
  function updateTask(newTask: TTask) {
    const newTasks = tasks.map(t => (t.id === newTask.id ? { ...newTask } : t))
    setTasks(newTasks)
  }
  function getTask(taskId: string) {
    return tasks.find(t => t.id === taskId)
  }
  return { tasks, addTask, deleteTask, updateTask, getTask }
}

export { TaskProvider, useTaskContext }

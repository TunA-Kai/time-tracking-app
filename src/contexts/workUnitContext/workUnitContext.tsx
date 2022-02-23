import * as React from 'react'
import { workUnitsColRef } from '../../firebaseConfig'
import { SetValue, TWorkUnit } from '../../types'
import { useGetCollectionFirebase } from '../../utils/hooks/useGetCollectionFirebase'

interface TWorkState {
  workStatus: 'idle' | 'working' | 'pause'
  workDuration: number
}

type TWorkAction = { type: 'start' | 'pause' | 'continue' | 'stop' | 'working' }

interface WorkUnitContextType {
  workUnits: TWorkUnit[]
  setWorkUnits: SetValue<TWorkUnit[]>
  workDetail: TWorkState
  dispatch: React.Dispatch<TWorkAction>
}

const WorkUnitContext = React.createContext<WorkUnitContextType | undefined>(undefined)
WorkUnitContext.displayName = 'WorkUnitContext'

function workReducer(state: TWorkState, action: TWorkAction): TWorkState {
  switch (action.type) {
    case 'start':
      return { workStatus: 'working', workDuration: 0 }
    case 'working':
      return { ...state, workDuration: state.workDuration + 1 }
    case 'pause':
      return { ...state, workStatus: 'pause' }
    case 'continue':
      return { ...state, workStatus: 'working' }
    case 'stop':
      return { ...state, workStatus: 'idle' }
  }
}

function WorkUnitProvider({ children }: { children: React.ReactNode }) {
  const [workUnits, setWorkUnits] = useGetCollectionFirebase<TWorkUnit>(workUnitsColRef)
  const [workDetail, dispatch] = React.useReducer(workReducer, {
    workStatus: 'idle',
    workDuration: 0,
  })
  const contextValue = React.useMemo(
    () => ({ workUnits, setWorkUnits, workDetail, dispatch }),
    [setWorkUnits, workDetail, workUnits],
  )
  return <WorkUnitContext.Provider value={contextValue}>{children}</WorkUnitContext.Provider>
}

function useWorkUnitContext() {
  const context = React.useContext(WorkUnitContext)
  if (context === undefined)
    throw new Error('useWorkUnitContext must be used within a WorkUnitProvider')
  return context
}

export { WorkUnitProvider, useWorkUnitContext }

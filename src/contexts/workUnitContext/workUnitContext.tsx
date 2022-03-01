import * as React from 'react'
import { workUnitsColRef } from '../../firebaseConfig'
import { DateString, SetValue, TWorkUnit } from '../../types'
import { useGetCollectionFirebase } from '../../utils/hooks/useGetCollectionFirebase'
import { useInterval } from '../../utils/hooks/useInterval'

type TWorkStatus = 'idle' | 'working' | 'pause'

interface WorkUnitContextType {
  workUnits: TWorkUnit[]
  setWorkUnits: SetValue<TWorkUnit[]>
  timerRef: React.MutableRefObject<number>
  workStatus: TWorkStatus
  setWorkStatus: SetValue<TWorkStatus>
  groupedWorkUnits: Record<string, TWorkUnit[]>
}

const WorkUnitContext = React.createContext<WorkUnitContextType | undefined>(undefined)
WorkUnitContext.displayName = 'WorkUnitContext'

function WorkUnitProvider({ children }: { children: React.ReactNode }) {
  const [workUnits, setWorkUnits] = useGetCollectionFirebase<TWorkUnit>(workUnitsColRef)
  const timerRef = React.useRef(0)
  const [workStatus, setWorkStatus] = React.useState<TWorkStatus>('idle')

  useInterval(() => timerRef.current++, workStatus === 'working' ? 1000 : null)

  const groupedWorkUnits = React.useMemo(
    () =>
      workUnits.reduce((final, current) => {
        const { date } = current
        if (date in final) final[date].push(current)
        else final[date] = [current]
        return final
      }, {} as Record<DateString, TWorkUnit[]>),
    [workUnits],
  )

  const contextValue = React.useMemo(
    () => ({ workUnits, setWorkUnits, timerRef, workStatus, setWorkStatus, groupedWorkUnits }),
    [setWorkUnits, workStatus, workUnits, groupedWorkUnits],
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

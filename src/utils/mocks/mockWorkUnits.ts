import { mockTasks } from './mockTasks'

const workUnits = [
  [
    {
      description: 'Learning database',
      details: 'watch videos from firebase firestore',
      date: new Date(2022, 1, 16),
      workStart: new Date(2022, 1, 16, 5, 30),
      workEnd: new Date(2022, 1, 16, 6, 40),
      task: mockTasks[0],
    },
  ],
]

export { workUnits }

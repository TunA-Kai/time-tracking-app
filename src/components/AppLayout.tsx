import { Outlet } from 'react-router-dom'
import { SideBar } from '.'
import { TagProvider } from '../contexts/tagContext/tagContext'
import { TaskProvider } from '../contexts/taskContext/taskContext'
// import { collection, addDoc } from 'firebase/firestore'
// import { db } from '../firebaseConfig'

// async function test() {
//   try {
//     const docRef = await addDoc(collection(db, 'users'), {
//       first: 'Ada',
//       last: 'Lovelace',
//       born: 1815,
//     })
//     console.log('Document written with ID: ', docRef.id)
//   } catch (e) {
//     console.error('Error adding document: ', e)
//   }
// }

// test()
interface AppLayoutProps {}

function AppLayout({}: AppLayoutProps) {
  return (
    <div className='flex h-screen w-screen text-slate-50'>
      <aside className='bg-slate-800 px-2 py-4'>
        <SideBar />
      </aside>
      <main className='grow bg-slate-900 p-4 pb-0'>
        <TaskProvider>
          <TagProvider>
            <Outlet />
          </TagProvider>
        </TaskProvider>
      </main>
    </div>
  )
}

export default AppLayout

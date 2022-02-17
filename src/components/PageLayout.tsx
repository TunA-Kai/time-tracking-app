import { ReactNode } from 'react'

interface PageLayoutProps {
  title: string
  children: ReactNode
}

function PageLayout({ title, children }: PageLayoutProps) {
  return (
    <>
      <h2 className='h-16 text-3xl font-bold'>{title}</h2>
      {/* space is 20 because padding 4 and title height 16 */}
      <main className='h-[calc(100vh-theme(space.20))] overflow-y-auto'>{children}</main>
    </>
  )
}

export default PageLayout

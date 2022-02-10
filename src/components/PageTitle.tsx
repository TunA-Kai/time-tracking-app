interface PageTitleProps {
  title: string
}

function PageTitle({ title }: PageTitleProps) {
  return <h2 className='mb-10 text-3xl font-bold'>{title}</h2>
}

export default PageTitle

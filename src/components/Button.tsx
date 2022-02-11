// replace this component with .button class in CSS

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

function Button({ children, className: additionStyles = '', ...props }: ButtonProps) {
  return (
    <button className={`rounded-md p-2 hover:bg-slate-700 ${additionStyles}`} {...props}>
      {children}
    </button>
  )
}

export default Button

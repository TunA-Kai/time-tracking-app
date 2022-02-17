// replace this component with .button class in CSS

import { createElement, ElementType } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  as: ElementType
}

function Button({ className: additionStyles = '', as: Component, ...props }: ButtonProps) {
  return createElement(Component, {
    className: `rounded-md p-2 hover:bg-slate-700 ${additionStyles}`,
    ...props,
  })
}

export default Button

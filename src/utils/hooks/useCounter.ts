import * as React from 'react'

interface Options {
  initialValue?: number
  maxValue?: number
  minValue?: number
  step?: number
}

/**
 * @returns Tuple [count, increment, decrement, reset, setCount]
 */
function useCounter({
  initialValue = 0,
  maxValue = Infinity,
  minValue = -Infinity,
  step = 1,
}: Options = {}) {
  const [count, setCount] = React.useState(initialValue)

  function increment() {
    setCount(x => {
      const newValue = x + step
      return newValue > maxValue ? maxValue : newValue
    })
  }

  function decrement() {
    setCount(x => {
      const newValue = x - step
      return newValue < minValue ? minValue : newValue
    })
  }

  const reset = () => setCount(initialValue)

  return [count, increment, decrement, reset, setCount] as const
}

export default useCounter

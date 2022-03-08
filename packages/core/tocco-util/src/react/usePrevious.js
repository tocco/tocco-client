import {useEffect, useRef} from 'react'

const usePrevious = value => {
  const ref = useRef()

  useEffect(() => {
    ref.current = value
  }, [value]) // Only re-run if value changes

  return ref.current
}

export default usePrevious

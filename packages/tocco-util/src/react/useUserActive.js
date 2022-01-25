import {useState, useRef, useEffect, useCallback} from 'react'

const useUserActive = callback => {
  const timer = useRef(null)
  const [duration, setDuration] = useState(null)

  const start = useCallback(() => {
    if (duration > 0) {
      timer.current = setTimeout(() => {
        callback()
      }, duration)
    }
  }, [duration, callback])

  const abort = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current)
    }
  }, [])

  useEffect(() => {
    abort()

    // listen for user activity
    window.addEventListener('mousemove', start, {once: true})
    window.addEventListener('touchstart', start, {once: true})

    return () => {
      abort()
    }
  }, [abort, start])

  return [setDuration, abort, start]
}

export default useUserActive

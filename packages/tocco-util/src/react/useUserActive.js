import {useState, useRef, useEffect} from 'react'

const useUserActive = callback => {
  const timer = useRef(null)
  const [duration, setDuration] = useState(null)

  const listenForUserActivity = () => {
    window.addEventListener('mousemove', start, {once: true})
    window.addEventListener('touchstart', start, {once: true})
  }

  useEffect(() => {
    abort()
    listenForUserActivity()

    return () => {
      abort()
    }
  }, [duration])

  const start = () => {
    if (duration > 0) {
      timer.current = setTimeout(() => {
        callback()
      }, duration)
    }
  }

  const abort = () => {
    if (timer.current) {
      clearTimeout(timer.current)
    }
  }

  return [setDuration, abort, start]
}

export default useUserActive

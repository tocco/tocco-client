import {useState, useEffect} from 'react'

function useUserActive(callback) {
  const [timer, setTimer] = useState(null)
  const [duration, setDuration] = useState(null)
  const [userActivity, setUserActivity] = useState(null)

  useEffect(() => {
    if (duration > 0) {
      const t = setTimeout(() => {
        callback()
      }, duration)

      setTimer(t)
    }
  }, [userActivity])

  const listenForUserActivity = () => {
    window.addEventListener('mousemove', setUserActivity, {once: true})
    window.addEventListener('touchstart', setUserActivity, {once: true})
  }

  useEffect(() => {
    abort()
    listenForUserActivity()
  }, [duration])

  const setDurationHandler = duration => {
    setDuration(duration)
  }

  const abort = () => {
    if (timer) {
      clearTimeout(timer)
    }
  }

  return [setDurationHandler, abort]
}
export default useUserActive

import {useEffect} from 'react'

export default (ref, callback) => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        callback()
        observer.disconnect()
      }
    }
  )
  
  useEffect(() => {
    observer.observe(ref.current)
    return () => {
      observer.disconnect()
    }
  }, [])
}

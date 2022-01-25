import {useEffect} from 'react'

export default (ref, callback) => {
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      callback()
      observer.disconnect()
    }
  })

  // call on mount only
  useEffect(() => {
    observer.observe(ref.current)
    return () => {
      observer.disconnect()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
}

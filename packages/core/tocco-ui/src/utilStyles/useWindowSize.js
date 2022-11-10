import {useState, useEffect} from 'react'

const getWindowHeight = () => Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
const getWindowWidth = () => Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: getWindowWidth(),
    height: getWindowHeight()
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: getWindowWidth(),
        height: getWindowHeight()
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}

import {useState, useEffect} from 'react'

export const useCollapseOnMobile = initialCollapseState => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const getWindowWidth = () => window.innerWidth
  const [windowWidth, setWindowWidth] = useState(getWindowWidth())

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(getWindowWidth())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [windowWidth])

  useEffect(() => {
    if (windowWidth < 768) {
      setIsCollapsed(true)
    } else {
      setIsCollapsed(initialCollapseState)
    }
  }, [windowWidth, initialCollapseState])

  return [isCollapsed, setIsCollapsed]
}

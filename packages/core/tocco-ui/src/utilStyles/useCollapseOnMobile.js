import {useState, useEffect, useCallback} from 'react'

const getWindowWidth = () => window.innerWidth

export const useCollapseOnMobile = (initialCollapseState, setSearchFormCollapsed) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
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

  const toggleCollapse = useCallback(() => {
    setIsCollapsed(!isCollapsed)

    /* only toggle searchFormCollapsed on larger resolutions */
    /* otherwise a double click is needed to reopen collapsed panel on smaller screens */
    if (getWindowWidth() > 768) {
      setSearchFormCollapsed(!isCollapsed)
    }
  }, [isCollapsed, setSearchFormCollapsed])

  return {isCollapsed, toggleCollapse}
}

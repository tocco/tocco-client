import PropTypes from 'prop-types'
import React, {memo, useRef, useState, useEffect} from 'react'

import StyledLayoutContainer from './StyledLayoutContainer'

const LayoutContainer = ({children}) => {
  const ref = useRef(null)
  const [containerWidth, setContainerWidth] = useState(0)

  const setDeviceIndependentPixelWidth = () => {
    setContainerWidth(Math.floor(ref.current.offsetWidth / window.devicePixelRatio))
  }

  useEffect(() => {
    setDeviceIndependentPixelWidth()
    window.addEventListener('resize', setDeviceIndependentPixelWidth)
  }, [])

  return (
    <StyledLayoutContainer ref={ref} containerWidth={containerWidth}>
      {children}
    </StyledLayoutContainer>
  )
}

LayoutContainer.propTypes = {
  children: PropTypes.node
}

export default memo(LayoutContainer)

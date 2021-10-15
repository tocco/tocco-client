import PropTypes from 'prop-types'
import React, {useRef, useState, useEffect} from 'react'

import StyledLayoutContainer from './StyledLayoutContainer'

const LayoutContainer = ({
  children,
  occupiesRemainingHeight,
  minBoxWidth
}) => {
  const ref = useRef(null)
  const [containerWidth, setContainerWidth] = useState(0)

  const setPixelWidth = () => {
    setContainerWidth(ref.current.offsetWidth)
  }

  useEffect(() => {
    setPixelWidth()
    window.addEventListener('resize', setPixelWidth)
    return () => window.removeEventListener('resize', setPixelWidth)
  }, [])

  return (
    <StyledLayoutContainer
      ref={ref}
      containerWidth={containerWidth}
      occupiesRemainingHeight={occupiesRemainingHeight}
      minBoxWidth={minBoxWidth}>
      {children}
    </StyledLayoutContainer>
  )
}

LayoutContainer.propTypes = {
  children: PropTypes.node,
  occupiesRemainingHeight: PropTypes.bool,
  minBoxWidth: PropTypes.number
}

LayoutContainer.defaultProps = {
  minBoxWidth: 250
}

export default LayoutContainer

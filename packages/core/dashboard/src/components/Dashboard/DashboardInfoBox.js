import PropTypes from 'prop-types'
import {useState, useEffect} from 'react'
import {errorLogging} from 'tocco-app-extensions'

import InfoBox from '../InfoBox/InfoBox'
import {StyledInfoBoxWrapper, StyledResizeHandle} from './StyledComponents'

const DashboardInfoBox = ({infoBox, isResizing, startResize, onDragStart, onDragEnter, onDragOver, onDrop}) => {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const updateWindowDimensions = () => {
      const newHeight = window.innerWidth
      setWidth(newHeight)
    }

    window.addEventListener('resize', updateWindowDimensions)

    return () => window.removeEventListener('resize', updateWindowDimensions)
  }, [])

  const {id, type, label, height, content} = infoBox

  return (
    <errorLogging.ErrorBoundary>
      <StyledInfoBoxWrapper key={`${type}-${id}`} id={`infobox-${id}`} data-cy={`infobox-${id}`}>
        <InfoBox
          id={id}
          label={label}
          height={height}
          content={content}
          draggable={width > 800}
          onDragStart={onDragStart}
          onDragEnter={onDragEnter}
          onDragOver={onDragOver}
          onDrop={onDrop}
        />
        <StyledResizeHandle onMouseDown={startResize} isReszing={isResizing} />
      </StyledInfoBoxWrapper>
    </errorLogging.ErrorBoundary>
  )
}

DashboardInfoBox.propTypes = {
  infoBox: PropTypes.object.isRequired,
  isResizing: PropTypes.bool.isRequired,
  startResize: PropTypes.func.isRequired,
  onDragStart: PropTypes.func,
  onDragEnter: PropTypes.func,
  onDragOver: PropTypes.func,
  onDrop: PropTypes.func
}

export default DashboardInfoBox

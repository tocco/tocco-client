import PropTypes from 'prop-types'
import React from 'react'

import InfoBox from '../InfoBox/InfoBox'
import {StyledInfoBoxWrapper, StyledResizeHandle} from './StyledComponents'

const DashboardInfoBox = ({infoBox, isResizing, startResize, onDragStart, onDragEnter, onDragOver, onDrop}) => {
  const {id, type, label, height, content} = infoBox
  return (
    <StyledInfoBoxWrapper key={`${type}-${id}`} id={`infobox-${id}`}>
      <InfoBox
        id={id}
        label={label}
        height={height}
        content={content}
        draggable
        onDragStart={onDragStart}
        onDragEnter={onDragEnter}
        onDragOver={onDragOver}
        onDrop={onDrop}
      />
      <StyledResizeHandle onMouseDown={startResize} isReszing={isResizing} />
    </StyledInfoBoxWrapper>
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

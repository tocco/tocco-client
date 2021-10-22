import React from 'react'
import PropTypes from 'prop-types'

import {StyledInfoBoxWrapper, StyledResizeHandle} from './StyledComponents'
import {DEFAULT_HEIGHT} from '../../utils/constants'
import InfoBox from '../InfoBox/InfoBox'

const DashboardInfoBox = props => {
  const {
    infoBox,
    isResizing,
    startResize,
    onDragStart,
    onDragEnter,
    onDragOver,
    onDrop,
    onDragEnd
  } = props
  const {id, type, label, height, content} = infoBox
  return (
    <StyledInfoBoxWrapper key={`${type}-${id}`} id={`infobox-${id}`}>
      <InfoBox
        id={id}
        label={label}
        height={height || DEFAULT_HEIGHT}
        content={content}
        draggable
        onDragStart={onDragStart}
        onDragEnter={onDragEnter}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onDragEnd={onDragEnd}
      />
      <StyledResizeHandle
        onMouseDown={startResize}
        isReszing={isResizing}
      />
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
  onDrop: PropTypes.func,
  onDragEnd: PropTypes.func
}

export default DashboardInfoBox

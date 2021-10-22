import React from 'react'
import PropTypes from 'prop-types'

import {StyledColumn} from './StyledComponents'
import DashboardInfoBox from './DashboardInfoBox'
import {InfoBoxRenderTypes} from '../../utils/infoBoxTypes'
import DropPreview from '../InfoBox/DropPreview'
import {DEFAULT_HEIGHT} from '../../utils/constants'
import DropTypes from '../../utils/dropTypes'

const DashboardColumn = ({
  onDragEnter,
  onDragOver,
  onDrop,
  infoBoxes,
  resizeState,
  startResize,
  dndState,
  makeDndEvents
}) => {
  const {currentlyDragOver} = dndState
  const {isResizing, resizingElement} = resizeState

  return (
    <StyledColumn
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      {infoBoxes.map(infoBox => {
        const {id, height, type} = infoBox
        if (type === InfoBoxRenderTypes.DropPreview) {
          return <DropPreview
            key={`${type}-${id}`}
            height={height || DEFAULT_HEIGHT}
            {...makeDndEvents(currentlyDragOver)}
          />
        }
        
        return <DashboardInfoBox
          key={`${type}-${id}`}
          id={`infobox-${id}`}
          infoBox={infoBox}
          isResizing={isResizing && resizingElement === id}
          {...makeDndEvents({type: DropTypes.InfoBox, id})}
          startResize={startResize(id)}
        />
      })}
    </StyledColumn>
  )
}

DashboardColumn.propTypes = {
  infoBoxes: PropTypes.array.isRequired,
  onDragEnter: PropTypes.func,
  onDragOver: PropTypes.func,
  onDrop: PropTypes.func,
  resizeState: PropTypes.object.isRequired,
  dndState: PropTypes.object.isRequired,
  makeDndEvents: PropTypes.func.isRequired,
  startResize: PropTypes.func.isRequired
}

export default DashboardColumn

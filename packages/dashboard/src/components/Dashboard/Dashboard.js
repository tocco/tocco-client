import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {dragAndDrop} from 'tocco-util'

import {StyledDashboardWrapper, StyledColumn} from './StyledComponents'
import InfoBox from '../InfoBox/InfoBox'
import DropTypes from '../../utils/dropTypes'
import {
  appendDraggedAsLastItemToDropped,
  getRenderInfoBoxesForColumn,
  moveDraggedToDropped
} from '../../utils/dashboardUtils'
import DropPreview from '../InfoBox/DropPreview'
import {InfoBoxRenderTypes} from '../../utils/infoBoxTypes'
import {mapPositionToColAndRow} from '../../utils/positionUtils'

const MockColumns = [0, 1]

const Dashboard = ({infoboxes}) => {
  const [infoBoxes, setInfoBoxes] = useState(infoboxes.map(box => ({...box, ...mapPositionToColAndRow(box.position)})))
  const columns = MockColumns

  const changeInfoBoxPosition = (currentlyDragging, currentlyDragOver, position) => {
    const {id: draggingId} = currentlyDragging
    const {type: dragOverType, id: dragOverId} = currentlyDragOver
    if (dragOverType === DropTypes.Column) {
      setInfoBoxes(boxes => appendDraggedAsLastItemToDropped(draggingId, dragOverId, boxes))
    } else if (draggingId !== dragOverId) {
      setInfoBoxes(boxes => moveDraggedToDropped(draggingId, dragOverId, position, boxes))
    }
  }
  const {dndEvents, dndState} = dragAndDrop.useDnD(changeInfoBoxPosition, infoBoxes)
  const {currentlyDragOver, currentlyDragging, dropPosition} = dndState

  const {id: draggingId} = currentlyDragging || {}

  return (
      <StyledDashboardWrapper>
        {columns.map(column => {
          const {onDragEnter, onDragOver, onDrop} = dndEvents({type: DropTypes.Column, id: column})
          const boxes = getRenderInfoBoxesForColumn(draggingId, currentlyDragOver, dropPosition, column, infoBoxes)

          return <StyledColumn
              key={column}
              onDragEnter={onDragEnter}
              onDragOver={onDragOver}
              onDrop={onDrop}
            >
              {boxes.map(({id, label, height, content, type}) => {
                if (type === InfoBoxRenderTypes.DropPreview) {
                  return <DropPreview
                    key={`${type}-${id}`}
                    {...dndEvents(currentlyDragOver)}
                  />
                }
                
                return <InfoBox
                  key={`${type}-${id}`}
                  id={id}
                  label={label}
                  height={height}
                  content={content}
                  draggable
                  {...dndEvents({type: DropTypes.InfoBox, id})}
                />
              }
              )}
            </StyledColumn>
        })}
      </StyledDashboardWrapper>
  )
}

Dashboard.propTypes = {
  infoboxes: PropTypes.array.isRequired
}

export default Dashboard

import React, {useState} from 'react'
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

const MockColumns = [0, 1]
const MockInfoBoxes = [
  {id: 1, col: 0, row: 0},
  {id: 2, col: 0, row: 1},
  {id: 3, col: 0, row: 2},
  {id: 4, col: 1, row: 0}]

const Dashboard = () => {
  const [infoBoxes, setInfoBoxes] = useState(MockInfoBoxes)
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
              {boxes.map(({id, type}) => {
                if (type === InfoBoxRenderTypes.DropPreview) {
                  return <DropPreview
                    key={`${type}-${id}`}
                    {...dndEvents(currentlyDragOver)}
                  />
                }
                
                return <InfoBox
                  key={`${type}-${id}`}
                  index={id}
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

Dashboard.propTypes = {}

export default Dashboard

import React, {useCallback, useEffect, useRef, useState} from 'react'
import PropTypes from 'prop-types'
import {dragAndDrop, resize} from 'tocco-util'

import {
  StyledDashboardWrapper,
  StyledColumnWrapper,
  StyledColumn,
  StyledResizeHandle,
  StyledInfoBoxWrapper
} from './StyledComponents'
import InfoBox from '../InfoBox/InfoBox'
import DropTypes from '../../utils/dropTypes'
import {
  appendDraggedAsLastItemToDropped,
  getRenderInfoBoxesForColumn,
  moveDraggedToDropped
} from '../../utils/dashboardUtils'
import DropPreview from '../InfoBox/DropPreview'
import {InfoBoxRenderTypes} from '../../utils/infoBoxTypes'
import Menu from '../Menu/MenuContainer'
import {DEFAULT_HEIGHT, NUMBER_OF_COLUMNS} from '../../utils/constants'

const Dashboard = props => {
  const [infoBoxes, setInfoBoxes] = useState(props.infoBoxes)

  useEffect(() => {
    setInfoBoxes(props.infoBoxes)
  }, [props.infoBoxes])

  const columns = [...Array(NUMBER_OF_COLUMNS).keys()]

  const ref = useRef(null)
  const selector = id => ref.current.querySelector(`#infobox-${id}`)
  const onInfoBoxHeightChanged = useCallback(id => {
    const finalHeight = infoBoxes.find(c => c.id === id)?.height
    props.saveInfoBoxHeight(id, finalHeight)
  }, [infoBoxes])

  const onInfoBoxHeightChanging = useCallback((id, {height}) => {
    setInfoBoxes(infoBoxes => [...infoBoxes.map(c => c.id === id
      ? {
          ...c,
          height
        }
      : c)])
  }, [])

  const {
    startResize,
    resizingEvents,
    resizeState
  } = resize.useResize(selector, onInfoBoxHeightChanging, onInfoBoxHeightChanged)

  const changeInfoBoxPosition = (currentlyDragging, currentlyDragOver, position) => {
    const {id: draggingId} = currentlyDragging
    const {type: dragOverType, id: dragOverId} = currentlyDragOver
    if (dragOverType === DropTypes.Column) {
      const updatedInfoBoxes = appendDraggedAsLastItemToDropped(draggingId, dragOverId, infoBoxes)
      setInfoBoxes(updatedInfoBoxes)
      props.saveInfoBoxPositions(updatedInfoBoxes)
    } else if (draggingId !== dragOverId) {
      const updatedInfoBoxes = moveDraggedToDropped(draggingId, dragOverId, position, infoBoxes)
      setInfoBoxes(updatedInfoBoxes)
      props.saveInfoBoxPositions(updatedInfoBoxes)
    }
  }
  const {dndEvents, dndState} = dragAndDrop.useDnD(changeInfoBoxPosition, infoBoxes)
  const {currentlyDragOver, currentlyDragging, dropPosition} = dndState

  const {id: draggingId} = currentlyDragging || {}

  return (
      <StyledDashboardWrapper ref={ref} {...resizingEvents}>
        <Menu/>
        <StyledColumnWrapper>
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
                      height={height || DEFAULT_HEIGHT}
                      {...dndEvents(currentlyDragOver)}
                    />
                  }
                  
                  return <StyledInfoBoxWrapper key={`${type}-${id}`} id={`infobox-${id}`}>
                    <InfoBox
                      id={id}
                      label={label}
                      height={height || DEFAULT_HEIGHT}
                      content={content}
                      draggable
                      {...dndEvents({type: DropTypes.InfoBox, id})}
                    />
                    <StyledResizeHandle
                      onMouseDown={startResize(id)}
                      isReszing={resizeState.isResizing && resizeState.resizingElement === id}
                    />
                  </StyledInfoBoxWrapper>
                })}
              </StyledColumn>
          })}
        </StyledColumnWrapper>
      </StyledDashboardWrapper>
  )
}

Dashboard.propTypes = {
  infoBoxes: PropTypes.array.isRequired,
  saveInfoBoxPositions: PropTypes.func.isRequired,
  saveInfoBoxHeight: PropTypes.func.isRequired
}

export default Dashboard

import PropTypes from 'prop-types'
import {useCallback, useEffect, useRef, useState} from 'react'
import {LoadMask} from 'tocco-ui'
import {dragAndDrop, resize} from 'tocco-util'

import {NUMBER_OF_COLUMNS} from '../../utils/constants'
import {
  appendDraggedAsLastItemToDropped,
  getRenderInfoBoxesForColumn,
  moveDraggedToDropped
} from '../../utils/dashboardUtils'
import DropTypes from '../../utils/dropTypes'
import Menu from '../Menu/MenuContainer'
import DashboardColumn from './DashboardColumn'
import {StyledDashboardWrapper, StyledColumnWrapper} from './StyledComponents'

const Dashboard = ({infoBoxes: storedInfoBoxes, saveInfoBoxHeight, saveInfoBoxPositions}) => {
  const infoBoxesLoaded = storedInfoBoxes?.length >= 0

  // save infoBoxes in local state to show drag and drop and resize immediately to the user
  const [infoBoxes, setInfoBoxes] = useState(storedInfoBoxes || [])
  useEffect(() => {
    setInfoBoxes(storedInfoBoxes || [])
  }, [storedInfoBoxes])

  const columns = [...Array(NUMBER_OF_COLUMNS).keys()]

  const ref = useRef(null)
  const selector = useCallback(id => ref.current.querySelector(`#infobox-${id}`), [])
  const onInfoBoxHeightChanged = useCallback(
    id => {
      const finalHeight = infoBoxes.find(c => c.id === id)?.height
      saveInfoBoxHeight(id, finalHeight)
    },
    [infoBoxes, saveInfoBoxHeight]
  )

  const onInfoBoxHeightChanging = useCallback((id, {height}) => {
    setInfoBoxes(boxes => [
      ...boxes.map(c =>
        c.id === id
          ? {
              ...c,
              height
            }
          : c
      )
    ])
  }, [])

  const {startResize, resizingEvents, resizeState} = resize.useResize(
    selector,
    onInfoBoxHeightChanging,
    onInfoBoxHeightChanged
  )

  const changeInfoBoxPosition = (currentlyDragging, currentlyDragOver, position) => {
    const {id: draggingId} = currentlyDragging
    const {type: dragOverType, id: dragOverId} = currentlyDragOver
    if (dragOverType === DropTypes.Column) {
      const updatedInfoBoxes = appendDraggedAsLastItemToDropped(draggingId, dragOverId, infoBoxes)
      setInfoBoxes(updatedInfoBoxes)
      saveInfoBoxPositions(updatedInfoBoxes)
    } else if (draggingId !== dragOverId) {
      const updatedInfoBoxes = moveDraggedToDropped(draggingId, dragOverId, position, infoBoxes)
      setInfoBoxes(updatedInfoBoxes)
      saveInfoBoxPositions(updatedInfoBoxes)
    }
  }
  const {dndEvents, dndState} = dragAndDrop.useDnD(changeInfoBoxPosition, infoBoxes)
  const {currentlyDragOver, currentlyDragging, dropPosition} = dndState

  const {id: draggingId} = currentlyDragging || {}
  const DashboardColumns = columns.map(column => {
    const {onDragEnter, onDragOver, onDrop} = dndEvents({
      type: DropTypes.Column,
      id: column
    })
    const boxes = getRenderInfoBoxesForColumn(draggingId, currentlyDragOver, dropPosition, column, infoBoxes)

    return (
      <DashboardColumn
        key={column}
        onDragEnter={onDragEnter}
        onDragOver={onDragOver}
        onDrop={onDrop}
        infoBoxes={boxes}
        resizeState={resizeState}
        startResize={startResize}
        dndState={dndState}
        makeDndEvents={dndEvents}
      />
    )
  })

  return (
    <StyledDashboardWrapper ref={ref} {...resizingEvents}>
      <LoadMask required={[infoBoxesLoaded]}>
        <Menu />
        <StyledColumnWrapper>{DashboardColumns}</StyledColumnWrapper>
      </LoadMask>
    </StyledDashboardWrapper>
  )
}

Dashboard.propTypes = {
  infoBoxes: PropTypes.array,
  saveInfoBoxPositions: PropTypes.func.isRequired,
  saveInfoBoxHeight: PropTypes.func.isRequired
}

export default Dashboard

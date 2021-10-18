import React, {useCallback} from 'react'
import PropTypes from 'prop-types'
import {dragAndDrop, resize} from 'tocco-util'

import {StyledDnD, StyledTableHead, StyledTableHeaderCell, StyledTableRow, StyledDraggable} from './StyledTable'
import SortingState from './SortingState'
import ResizingController from './ResizingController'
import {columnPropType, dataPropType} from './propTypes'

const ThContent = ({column, data}) =>
  column.HeaderRenderer
    ? <column.HeaderRenderer column={column} data={data}/>
    : <div dangerouslySetInnerHTML={{__html: column.label}} title={column.label}/>

ThContent.propTypes = {
  data: dataPropType,
  column: columnPropType
}

const TableHeader = props => {
  const {
    columns,
    data,
    onColumnPositionChange,
    onSortingChange,
    tableEl,
    onColumnWidthChanging,
    onColumnWidthChanged
  } = props
  const {dndEvents, dndState} = dragAndDrop.useDnD(onColumnPositionChange)

  const currentResizeElementSelector = resizeElement =>
    tableEl.current.querySelector(`th[id='header-cell-${resizeElement.id}']`)

  const handleResize = useCallback((el, {width}) => onColumnWidthChanging(el.id, width), [onColumnWidthChanging])
  const handleResizeFinsihed = useCallback(el => onColumnWidthChanged(el.id), [onColumnWidthChanged])
  
  const {
    startResize,
    resizingEvents,
    resizeState
  } = resize.useResize(
    currentResizeElementSelector,
    handleResize,
    handleResizeFinsihed)

  const {isResizing, resizingElement} = resizeState

  const thOnClick = column => e => {
    if (!isResizing && column.sorting && column.sorting.sortable) {
      onSortingChange(column.id, e.shiftKey)
    }
  }

  return <StyledTableHead {...resizingEvents}>
    <StyledTableRow>
      {columns.map(column => {
        const key = `header-cell-${column.id}`
        return <StyledTableHeaderCell
          key={key}
          data-cy={key}
          id={key}
          onClick={thOnClick(column)}
          isResizingAnyCell={isResizing}
          isResizingThisCell={isResizing && column.id === resizingElement?.id}
          sortable={column.sorting && column.sorting.sortable}
          isDraggedOver={dndState.currentlyDragOver === column.id && dndState.currentlyDragging !== column.id}
        >
          <StyledDraggable
            id={`header-cell-drop-${column.id}`}
            key={`header-cell-drop-${column.id}`}
            {...(!column.fixedPosition && {
              draggable: true,
              ...dndEvents(column.id)
            })}
          >
            <StyledDnD
              isDragged={dndState.currentlyDragging === column.id}
            >
              <SortingState column={column}/>
              <ThContent column={column} data={data}/>
            </StyledDnD>
          </StyledDraggable>
          {column.resizable && <ResizingController column={column} startResize={startResize}/>}
        </StyledTableHeaderCell>
      }
      )}
    </StyledTableRow>
  </StyledTableHead>
}

TableHeader.propTypes = {
  columns: PropTypes.arrayOf(columnPropType).isRequired,
  data: dataPropType,
  onColumnWidthChanging: PropTypes.func,
  onColumnWidthChanged: PropTypes.func,
  onColumnPositionChange: PropTypes.func,
  onSortingChange: PropTypes.func,
  tableEl: PropTypes.shape({current: PropTypes.object})
}

export default TableHeader

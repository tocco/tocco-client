import PropTypes from 'prop-types'
import {useCallback} from 'react'
import {dragAndDrop, resize} from 'tocco-util'

import {columnPropType, dataPropType} from './propTypes'
import ResizingController from './ResizingController'
import SortingState from './SortingState'
import {
  StyledHeaderContentWrapper,
  StyledHeaderContent,
  StyledDnD,
  StyledDraggable,
  StyledTableHead,
  StyledTableHeaderCell,
  StyledTableRow
} from './StyledComponents'

const ThContent = ({column, data}) =>
  column.HeaderRenderer ? (
    <column.HeaderRenderer column={column} data={data} />
  ) : (
    <StyledHeaderContentWrapper>
      <StyledHeaderContent title={column.label} dangerouslySetInnerHTML={{__html: column.label}} />
      <SortingState column={column} />
    </StyledHeaderContentWrapper>
  )

ThContent.propTypes = {
  data: dataPropType,
  column: columnPropType
}

const TableHeader = props => {
  const {columns, data, onColumnPositionChange, onSortingChange, tableEl, onColumnWidthChanging, onColumnWidthChanged} =
    props
  const {dndEvents, dndState} = dragAndDrop.useDnD(onColumnPositionChange)

  // tableEl is a ref and has not to be added to the deps array
  const currentResizeElementSelector = useCallback(
    resizeElement => tableEl.current.querySelector(`th[id='header-cell-${resizeElement.id}']`),
    [] // eslint-disable-line react-hooks/exhaustive-deps
  )

  const handleResize = useCallback((el, {width}) => onColumnWidthChanging(el.id, width), [onColumnWidthChanging])
  const handleResizeFinished = useCallback(el => onColumnWidthChanged(el.id), [onColumnWidthChanged])

  const {startResize, resizingEvents, resizeState} = resize.useResize(
    currentResizeElementSelector,
    handleResize,
    handleResizeFinished
  )

  const {isResizing, resizingElement} = resizeState

  const thOnClick = column => e => {
    if (!isResizing && column.sorting && column.sorting.sortable) {
      onSortingChange(column.id, e.shiftKey)
    }
  }

  const StyledTableHeaderCells = columns.map(column => {
    const headerCellKey = `header-cell-${column.id}`
    const headerCellDropKey = `header-cell-drop-${column.id}`
    const isSortable = column.sorting && column.sorting.sortable
    const isResizingThisCell = isResizing && column.id === resizingElement?.id
    const isDraggedOver = dndState.currentlyDragOver === column.id && dndState.currentlyDragging !== column.id
    const isDragged = dndState.currentlyDragging === column.id

    return (
      <StyledTableHeaderCell
        key={headerCellKey}
        data-cy={headerCellKey}
        id={headerCellKey}
        onClick={thOnClick(column)}
        isResizingAnyCell={isResizing}
        isResizingThisCell={isResizingThisCell}
        isSortable={isSortable}
        isDraggedOver={isDraggedOver}
        rightAligned={column.rightAligned}
      >
        <StyledDraggable
          id={headerCellDropKey}
          key={headerCellDropKey}
          {...(!column.fixedPosition && {
            draggable: true,
            ...dndEvents(column.id)
          })}
        >
          <StyledDnD isDragged={isDragged}>
            <ThContent column={column} data={data} />
          </StyledDnD>
        </StyledDraggable>
        {column.resizable && <ResizingController column={column} startResize={startResize} />}
      </StyledTableHeaderCell>
    )
  })

  return (
    <StyledTableHead {...resizingEvents}>
      <StyledTableRow>{StyledTableHeaderCells}</StyledTableRow>
    </StyledTableHead>
  )
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

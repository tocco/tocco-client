import React from 'react'
import PropTypes from 'prop-types'

import {StyledDnD, StyledTableHead, StyledTableHeaderCell, StyledTableRow, StyledDraggable} from './StyledTable'
import SortingState from './SortingState'
import ResizingController from './ResizingController'
import {columnPropType, dataPropType} from './propTypes'
import useDnD from './useDnD'
import useResize from './useResize'

const ThContent = ({column, data}) =>
  column.HeaderRenderer
    ? <column.HeaderRenderer column={column} data={data} />
    : <div dangerouslySetInnerHTML={{__html: column.label}} title={column.label}/>

ThContent.propTypes = {
  data: dataPropType,
  column: columnPropType
}

const TableHeader = ({columns, data, onColumnPositionChange, onSortingChange, tableEl, resizeCallback}) => {
  const {dndEvents, dndState} = useDnD(onColumnPositionChange, columns)

  const {resizingColumn, startResize} = useResize(tableEl, resizeCallback)

  const thOnClick = column => e => {
    if (!resizingColumn && column.sorting && column.sorting.sortable) {
      onSortingChange(column.id, e.shiftKey)
    }
  }

  return <StyledTableHead>
    <StyledTableRow>
      {columns.map(column => {
        const key = `header-cell-${column.id}`
        return <StyledTableHeaderCell
          key={key}
          data-cy={key}
          id={key}
          onClick={thOnClick(column)}
          resizingColumn={resizingColumn}
          isResizing={resizingColumn && column.id === resizingColumn.id}
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
  onColumnPositionChange: PropTypes.func,
  onSortingChange: PropTypes.func,
  tableEl: PropTypes.shape({current: PropTypes.object}),
  resizeCallback: PropTypes.func
}

export default TableHeader

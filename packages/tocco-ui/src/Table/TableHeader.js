import React from 'react'
import PropTypes from 'prop-types'

import {StyledDnD, StyledTableHead, StyledTableHeaderCell, StyledTableRow} from './StyledTable'
import SortingState from './SortingState'
import ResizingController from './ResizingController'
import {columnPropType, dataPropType} from './propTypes'
import useDnD from './useDnD'
import useResize from './useResize'

const ThContent = ({column, data}) =>
  column.HeaderRenderer
    ? <column.HeaderRenderer column={column} data={data} />
    : <div dangerouslySetInnerHTML={{__html: column.label}}/>

ThContent.propTypes = {
  data: dataPropType,
  column: columnPropType
}

const TableHeader = ({columns, data, onColumnPositionChange, onSortingChange, tableEl, resizeCallback}) => {
  const {dndEvents, dndState} = useDnD(onColumnPositionChange, columns)

  const {resizingColumn, startResize} = useResize(tableEl, resizeCallback)

  const thOnClick = column => e => {
    if (!resizingColumn && column.sorting.sortable) {
      onSortingChange(column.id, e.shiftKey)
    }
  }

  return (
    <StyledTableHead>
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
          >
            <div
              style={{width: '100%', height: '100%', display: 'flex'}}
              id={`header-cell-drop-${column.id}`}
              key={`header-cell-drop-${column.id}`}
              {...(!column.fixedPosition && {
                draggable: true,
                ...dndEvents(column.id)
              })}
            >
              <StyledDnD
                isDraggedOver={dndState.currentlyDragOver === column.id && dndState.currentlyDragging !== column.id}
                isDragged={dndState.currentlyDragging === column.id}
              >
                <ThContent column={column} data={data}/>
                <SortingState column={column}/>
              </StyledDnD>
            </div>
            {column.resizable && <ResizingController column={column} startResize={startResize}/>}
          </StyledTableHeaderCell>
        }
        )}
      </StyledTableRow>
    </StyledTableHead>
  )
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

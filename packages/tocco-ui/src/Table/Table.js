import React, {useEffect, useRef, useState} from 'react'
import PropTypes from 'prop-types'

import StyledTable, {PaginationContainer, StretchingTableContainer, StyledTableWrapper} from './StyledTable'
import {Pagination} from '../'
import useSelection from './selection/useSelection'
import {selectionStylePropType} from './selection/selectionStyles'
import {getSelectionCell} from './selection/selectionColumnEnhancer'
import {columnPropType, dataPropType, keyPropType} from './propTypes'
import TableHeader from './TableHeader'
import TableBody from './TableBody'

const Table = props => {
  const [columns, setColumns] = useState(props.columns)
  const tableEl = useRef(null)

  const resizeCallback = (columnId, width) => {
    setColumns([...columns.map(c => c.id === columnId ? {
      ...c,
      width
    } : c)])
  }

  const {isSelected, selectionChange}
    = useSelection(props.selection, props.data.map(e => e.__key), props.onSelectionChange)

  useEffect(() => {
    const selectionColumn = getSelectionCell(props.selectionStyle, props.columns, isSelected, selectionChange)
    setColumns([...(selectionColumn ? [selectionColumn] : []), ...props.columns])
  }, [props.columns, props.selection])

  const showPagination = props.paginationInfo
    && (props.paginationInfo.totalCount - props.paginationInfo.recordsPerPage) > 0

  return <StyledTableWrapper>
    <StretchingTableContainer>
      <StyledTable ref={tableEl} columns={columns}>
        <TableHeader
          columns={columns}
          data={props.data}
          resizeCallback={resizeCallback}
          onColumnPositionChange={props.onColumnPositionChange}
          tableEl={tableEl}
          onSortingChange={props.onSortingChange}
        />
        <TableBody
          columns={columns}
          data={props.data}
          isSelected={isSelected}
          selectionChange={selectionChange}
          dataLoadingInProgress={props.dataLoadingInProgress}
          onRowClick={props.onRowClick}
        />
      </StyledTable>
    </StretchingTableContainer>
    {showPagination && <PaginationContainer>
      <Pagination
        onPageChange={props.onPageChange}
        currentPage={props.paginationInfo.currentPage}
        totalCount={props.paginationInfo.totalCount}
        recordsPerPage={props.paginationInfo.recordsPerPage}
      />
    </PaginationContainer>}
  </StyledTableWrapper>
}

Table.propTypes = {
  /**
   * Array of column definitions. Determines how the cells are rendered.
   */
  columns: PropTypes.arrayOf(columnPropType).isRequired,
  /**
   * List of data to be displayed in the table. Should contain a __key property.
   */
  data: dataPropType,
  /**
   * True if data loading is in process.
   */
  dataLoadingInProgress: PropTypes.bool,
  /**
   * Used to display pagination
   */
  paginationInfo: PropTypes.shape({
    totalCount: PropTypes.number,
    currentPage: PropTypes.number,
    recordsPerPage: PropTypes.number
  }),
  /**
   * Determines if a select row is added
   */
  selectionStyle: selectionStylePropType,
  /**
   * List of selected keys
   */
  selection: PropTypes.arrayOf(keyPropType),
  /**
   * Callback for selection changes
   */
  onSelectionChange: PropTypes.func,
  /**
   * Callback on page change
   */
  onPageChange: PropTypes.func,
  /**
   * Callback if a column is drag and dropped to a new position
   */
  onColumnPositionChange: PropTypes.func,
  /**
   * Callback if sorting changed
   */
  onSortingChange: PropTypes.func,
  /**
   * Callback if a row is clicked
   */
  onRowClick: PropTypes.func
}

export default Table

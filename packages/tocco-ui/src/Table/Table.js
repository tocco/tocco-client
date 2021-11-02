import React, {useCallback, useEffect, useRef, useState} from 'react'
import PropTypes from 'prop-types'
import {js} from 'tocco-util'

import StyledTable, {StretchingTableContainer, StyledTableWrapper} from './StyledTable'
import useSelection from './selection/useSelection'
import {selectionStylePropType} from './selection/selectionStyles'
import {getSelectionCell} from './selection/selectionColumnEnhancer'
import {columnPropType, dataPropType, keyPropType} from './propTypes'
import TableHeader from './TableHeader'
import TableBody from './TableBody'
import TableFooter from './TableFooter'

const Table = props => {
  const {
    selection,
    data,
    onSelectionChange,
    selectionStyle,
    paginationInfo,
    onColumnPositionChange,
    onSortingChange,
    dataLoadingInProgress,
    onRowClick,
    clickable,
    onPageChange,
    onPageRefresh
  } = props
  const [columns, setColumns] = useState(props.columns)
  const tableEl = useRef(null)

  const onColumnWidthChanged = useCallback(columnId => {
    const finalWidth = columns.find(c => c.id === columnId)?.width
    if (props.onColumnWidthChange) {
      props.onColumnWidthChange(columnId, finalWidth)
    }
  }, [columns])

  const onColumnWidthChanging = useCallback((columnId, width) => {
    setColumns([...columns.map(c => c.id === columnId
      ? {
          ...c,
          width
        }
      : c)])
  }, [columns])

  const {isSelected, selectionChange}
    = useSelection(selection, data ? data.map(e => e.__key) : [], onSelectionChange)

  useEffect(() => {
    const selectionColumn = getSelectionCell(selectionStyle, props.columns, isSelected, selectionChange)
    setColumns([...(selectionColumn ? [selectionColumn] : []), ...props.columns])
  }, [props.columns, selection])

  return <StyledTableWrapper>
    <StretchingTableContainer>
      <StyledTable ref={tableEl} columns={columns}>
        <TableHeader
          columns={columns}
          data={data}
          onColumnWidthChanging={onColumnWidthChanging}
          onColumnWidthChanged={onColumnWidthChanged}
          onColumnPositionChange={onColumnPositionChange}
          tableEl={tableEl}
          onSortingChange={onSortingChange}
        />
        <TableBody
          columns={columns}
          data={data}
          isSelected={isSelected}
          selectionChange={selectionChange}
          dataLoadingInProgress={dataLoadingInProgress}
          onRowClick={onRowClick}
          clickable={clickable}
        />
      </StyledTable>
    </StretchingTableContainer>
    <TableFooter onPageChange={onPageChange} onPageRefresh={onPageRefresh} paginationInfo={paginationInfo}/>
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
   * Boolean flag to disable clicking on rows
   */
  clickable: PropTypes.bool,
  /**
   * Callback for selection changes
   */
  onSelectionChange: PropTypes.func,
  /**
   * Callback on page change
   */
  onPageChange: PropTypes.func,
  /**
   * Callback on page reload
   */
  onPageRefresh: PropTypes.func,
  /**
   * Callback if a column is drag and dropped to a new position
   */
  onColumnPositionChange: PropTypes.func,
  /**
   * Callback if sorting changed
   */
  onSortingChange: PropTypes.func,
  /**
   * Callback if column got resized with drag and drop
   */
  onColumnWidthChange: PropTypes.func,
  /**
   * Callback if a row is clicked
   */
  onRowClick: PropTypes.func
}

const areEqual = (prevProps, nextProps) => {
  const diff = Object.keys(js.difference(prevProps, nextProps))
  return diff.length === 0
}

export default React.memo(Table, areEqual)

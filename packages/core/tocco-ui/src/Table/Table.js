import PropTypes from 'prop-types'
import React, {useCallback, useEffect, useRef, useState, useMemo} from 'react'
import {js} from 'tocco-util'

import {columnPropType, dataPropType, keyPropType, scrollBehaviourPropType} from './propTypes'
import {ScrollBehaviour} from './scrollBehaviour'
import {getSelectionCell} from './selection/selectionColumnEnhancer'
import {selectionStylePropType} from './selection/selectionStyles'
import useSelection from './selection/useSelection'
import {StyledTable, StretchingTableContainer, StyledTableWrapper} from './StyledComponents'
import TableBody from './TableBody'
import TableFooter from './TableFooter'
import TableHeader from './TableHeader'

const Table = ({
  columns: columnsProp,
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
  onPageRefresh,
  scrollBehaviour = ScrollBehaviour.INLINE,
  onColumnWidthChange,
  selectionFilterFn
}) => {
  const [columns, setColumns] = useState(columnsProp)
  const tableEl = useRef(null)

  const onColumnWidthChanged = useCallback(
    columnId => {
      const finalWidth = columns.find(c => c.id === columnId)?.width
      if (onColumnWidthChange) {
        onColumnWidthChange(columnId, finalWidth)
      }
    },
    [columns, onColumnWidthChange]
  )

  const onColumnWidthChanging = useCallback(
    (columnId, width) => {
      setColumns([
        ...columns.map(c =>
          c.id === columnId
            ? {
                ...c,
                width
              }
            : c
        )
      ])
    },
    [columns]
  )

  const currentKeys = useMemo(() => (data ? data.map(e => e.__key) : []), [data])

  const {isSelected, selectionChange} = useSelection(selection, currentKeys, onSelectionChange)

  useEffect(() => {
    const selectionColumn = getSelectionCell(
      selectionStyle,
      columnsProp,
      isSelected,
      selectionChange,
      selectionFilterFn
    )
    setColumns([...(selectionColumn ? [selectionColumn] : []), ...columnsProp])
  }, [columnsProp, selection, isSelected, selectionChange, selectionFilterFn, selectionStyle])

  return (
    <StyledTableWrapper>
      <StretchingTableContainer>
        <StyledTable ref={tableEl} columns={columns} scrollBehaviour={scrollBehaviour}>
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
      <TableFooter onPageChange={onPageChange} onPageRefresh={onPageRefresh} paginationInfo={paginationInfo} />
    </StyledTableWrapper>
  )
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
   * Defines how the table to handle scroll (default: inline)
   */
  scrollBehaviour: scrollBehaviourPropType,
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
  onRowClick: PropTypes.func,
  /**
   * Returns a bool to determine if passed row is selectable
   */
  selectionFilterFn: PropTypes.func
}

const areEqual = (prevProps, nextProps) => {
  const diff = Object.keys(js.difference(prevProps, nextProps))
  return diff.length === 0
}

export default React.memo(Table, areEqual)

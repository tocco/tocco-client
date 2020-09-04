import React from 'react'
import PropTypes from 'prop-types'
import {js} from 'tocco-util'

import {StyledTableCell} from './StyledTable'
import {Typography} from '../index'
import {columnPropType, rowDataPropType} from './propTypes'

const StaticCell = React.memo(({column, rowData, rowIdx}) => {
  return <StyledTableCell
    {...column.rightAligned === true && {style: {textAlign: 'right'}}}
    data-cy="list-cell"
  >
    {column.CellRenderer
      ? <column.CellRenderer rowData={rowData} column={column} rowIdx={rowIdx}/>
      : <Typography.Span>{rowData[column.id]}</Typography.Span>
    }
  </StyledTableCell>
})

StaticCell.propTypes = {
  rowData: rowDataPropType.isRequired,
  column: columnPropType.isRequired,
  rowIdx: PropTypes.number
}

const areEqual = (prevProps, nextProps) => {
  if (!prevProps.column.dynamic) {
    return true
  }
  const diff = Object.keys(js.difference(prevProps, nextProps))
  return diff.length === 0
}

export default React.memo(StaticCell, areEqual)

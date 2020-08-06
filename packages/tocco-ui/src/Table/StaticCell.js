import React from 'react'

import {StyledTableCell} from './StyledTable'
import {Typography} from '../index'
import {columnPropType, rowDataPropType} from './propTypes'

const StaticCell = React.memo(({column, rowData}) =>
  <StyledTableCell
    {...column.rightAligned === true && {style: {textAlign: 'right'}}}
    data-cy="list-cell"
  >
    {column.CellRenderer
      ? <column.CellRenderer rowData={rowData} column={column} />
      : <Typography.Span>{rowData[column.id]}</Typography.Span>
    }
  </StyledTableCell>
, props => !props.column.dynamic)

StaticCell.propTypes = {
  rowData: rowDataPropType.isRequired,
  column: columnPropType.isRequired
}

export default StaticCell

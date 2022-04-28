import PropTypes from 'prop-types'
import {FormattedMessage} from 'react-intl'

import {LoadingSpinner, Typography} from '../'
import {columnPropType, dataPropType} from './propTypes'
import StaticCell from './StaticCell'
import {StyledFullRow, StyledFullRowProgress, StyledTableBody, StyledTableRow} from './StyledComponents'

const InProgressRow = () => (
  <StyledTableRow>
    <StyledFullRowProgress>
      <LoadingSpinner size="20" />
      <Typography.P>
        <FormattedMessage id="client.component.table.dataLoading" />
      </Typography.P>
    </StyledFullRowProgress>
  </StyledTableRow>
)

const NoDataRow = () => (
  <StyledTableRow>
    <StyledFullRow>
      <Typography.Span>
        <FormattedMessage id="client.component.table.noData" />
      </Typography.Span>
    </StyledFullRow>
  </StyledTableRow>
)

const TableBody = ({data, columns, isSelected, selectionChange, dataLoadingInProgress, onRowClick, clickable}) => {
  const trOnClick = entity => e => {
    if (e.shiftKey) {
      selectionChange(entity.__key, true, true)
    } else if (e.metaKey || e.ctrlKey) {
      selectionChange(entity.__key)
    } else if (clickable && onRowClick) {
      onRowClick(entity.__key)
    }
  }

  return (
    <StyledTableBody>
      {dataLoadingInProgress ? (
        <InProgressRow />
      ) : data.length > 0 ? (
        data.map((rowData, idx) => (
          <StyledTableRow
            key={`list-row-${rowData.__key}`}
            className={`selectableRow ${isSelected(rowData.__key) && 'selected'}`}
            onClick={trOnClick(rowData)}
            clickable={clickable}
            data-cy="list-row"
          >
            {columns.map(column => (
              <StaticCell
                key={`table-static-cell-${rowData.__key}-${column.id}`}
                selected={isSelected(rowData.__key)}
                rowData={rowData}
                column={column}
                rowIdx={idx}
              />
            ))}
          </StyledTableRow>
        ))
      ) : (
        <NoDataRow />
      )}
    </StyledTableBody>
  )
}

TableBody.propTypes = {
  columns: PropTypes.arrayOf(columnPropType).isRequired,
  data: dataPropType,
  isSelected: PropTypes.func.isRequired,
  selectionChange: PropTypes.func,
  dataLoadingInProgress: PropTypes.bool,
  onRowClick: PropTypes.func,
  clickable: PropTypes.bool
}

export default TableBody

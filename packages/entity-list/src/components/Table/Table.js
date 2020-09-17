import React from 'react'
import PropTypes from 'prop-types'
import {js} from 'tocco-util'
import {columnPropType, selectionStylePropType, Table as UiTable} from 'tocco-ui'
import _get from 'lodash/get'

import {navigationCell} from './navigationCell'

const Table = props =>
  <UiTable
    data={props.entities}
    columns={[
      ...(props.showLink && props.linkFactory ? [navigationCell(props.linkFactory)] : []),
      ...props.columnDefinitions.sort((a, b) =>
        _get(props.positions, [a.id]) - _get(props.positions, [b.id])
      )
    ]}
    dataLoadingInProgress={props.inProgress}
    paginationInfo={{
      currentPage: props.currentPage,
      totalCount: props.entityCount,
      recordsPerPage: props.limit
    }}
    onPageChange={props.changePage}
    onSortingChange={props.setSortingInteractive}
    selectionStyle={props.tableSelectionStyle}
    onSelectionChange={props.onSelectChange}
    selection={props.selection}
    onRowClick={props.onRowClick}
    clickable={props.clickable}
    onColumnPositionChange={props.changePosition}
  />

Table.propTypes = {
  columnDefinitions: PropTypes.arrayOf(columnPropType).isRequired,
  entities: PropTypes.array.isRequired,
  entityCount: PropTypes.number,
  inProgress: PropTypes.bool,
  currentPage: PropTypes.number,
  limit: PropTypes.number,
  onRowClick: PropTypes.func,
  clickable: PropTypes.bool,
  setSortingInteractive: PropTypes.func,
  changePage: PropTypes.func.isRequired,
  tableSelectionStyle: selectionStylePropType,
  onSelectChange: PropTypes.func,
  selection: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  parent: PropTypes.shape({
    key: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    reverseRelationName: PropTypes.string
  }),
  showLink: PropTypes.bool,
  linkFactory: PropTypes.objectOf(PropTypes.func),
  changePosition: PropTypes.func.isRequired,
  positions: PropTypes.objectOf(PropTypes.number)
}

const areEqual = (prevProps, nextProps) => {
  const diff = js.difference(prevProps, nextProps)
  return Object.keys(diff).length === 0
}

export default React.memo(Table, areEqual)

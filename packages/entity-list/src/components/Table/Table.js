import React from 'react'
import PropTypes from 'prop-types'
import {js} from 'tocco-util'
import {columnPropType, selectionStylePropType, Table as UiTable} from 'tocco-ui'
import _get from 'lodash/get'

import {navigationCell} from './navigationCell'
import {markingCell} from './markingCell'

const Table = props => {
  const showNavigationLink = props.showLink
    && props.clickable
    && props.navigationStrategy
    && !!props.navigationStrategy.DetailLinkRelative
  const showPreferencesMenu = !props.disablePreferencesMenu
  const columns = [
    ...((showNavigationLink || showPreferencesMenu)
      ? [navigationCell(showNavigationLink,
          props.navigationStrategy,
          props.parent)]
      : []),
    ...(props.markable ? [markingCell()] : []),
    ...props.columnDefinitions
      .map(a => ({...a, width: _get(props.widths, a.id)}))
      .sort((a, b) =>
        _get(props.positions, [a.id]) - _get(props.positions, [b.id])
      )
  ]
  return <UiTable
    data={props.entities}
    columns={columns}
    onColumnWidthChange={props.changeWidth}
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
}

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
    reverseRelationName: PropTypes.string,
    relation: PropTypes.string
  }),
  showLink: PropTypes.bool,
  navigationStrategy: PropTypes.objectOf(PropTypes.func),
  changePosition: PropTypes.func.isRequired,
  positions: PropTypes.objectOf(PropTypes.number),
  changeWidth: PropTypes.func.isRequired,
  widths: PropTypes.objectOf(PropTypes.number),
  markable: PropTypes.bool,
  disablePreferencesMenu: PropTypes.bool
}

const areEqual = (prevProps, nextProps) => {
  const diff = js.difference(prevProps, nextProps)
  return Object.keys(diff).length === 0
}

export default React.memo(Table, areEqual)

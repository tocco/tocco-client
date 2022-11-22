import _get from 'lodash/get'
import PropTypes from 'prop-types'
import React from 'react'
import {columnPropType, selectionStylePropType, scrollBehaviourPropType, Table as UiTable} from 'tocco-ui'
import {js} from 'tocco-util'

import {markingCell} from './markingCell'
import {navigationCell} from './navigationCell'

const Table = ({
  showLink,
  clickable,
  navigationStrategy,
  disablePreferencesMenu,
  parent,
  markable,
  columnDefinitions,
  widths,
  positions,
  entities,
  changeWidth,
  inProgress,
  currentPage,
  entityCount,
  limit,
  changePage,
  refresh,
  setSortingInteractive,
  tableSelectionStyle,
  onSelectChange,
  selection,
  selectionFilterFn,
  scrollBehaviour,
  onRowClick,
  changePosition
}) => {
  const showNavigationLink = showLink && clickable && navigationStrategy && !!navigationStrategy.DetailLinkRelative
  const showPreferencesMenu = !disablePreferencesMenu
  const columns = [
    ...(showNavigationLink || showPreferencesMenu
      ? [navigationCell(showNavigationLink, navigationStrategy, parent)]
      : []),
    ...(markable ? [markingCell()] : []),
    ...columnDefinitions
      .map(a => ({...a, width: _get(widths, a.id)}))
      .sort((a, b) => _get(positions, [a.id]) - _get(positions, [b.id]))
  ]
  return (
    <UiTable
      data={entities}
      columns={columns}
      onColumnWidthChange={changeWidth}
      dataLoadingInProgress={inProgress}
      paginationInfo={{
        currentPage,
        totalCount: entityCount,
        recordsPerPage: limit
      }}
      onPageChange={changePage}
      onPageRefresh={refresh}
      onSortingChange={setSortingInteractive}
      selectionStyle={tableSelectionStyle}
      onSelectionChange={onSelectChange}
      selection={selection}
      selectionFilterFn={selectionFilterFn}
      scrollBehaviour={scrollBehaviour}
      onRowClick={onRowClick}
      clickable={clickable}
      onColumnPositionChange={(dragging, dragOver) => changePosition(dragging, dragOver, columns)}
    />
  )
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
  refresh: PropTypes.func,
  changePage: PropTypes.func.isRequired,
  tableSelectionStyle: selectionStylePropType,
  onSelectChange: PropTypes.func,
  selection: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  selectionFilterFn: PropTypes.func,
  scrollBehaviour: scrollBehaviourPropType,
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

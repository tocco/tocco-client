import React from 'react'
import PropTypes from 'prop-types'
import {intlShape} from 'react-intl'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'

import cellRenderer from '../../util/cellRenderer'
import {default as selectionStyles, selectionStylePropType} from '../../util/selectionStyles'
import StyledTable from './StyledTable'

const RIGHT_ALIGNED_TYPES = ['moneyamount', 'counter', 'integer', 'long']

const Table = props => {
  const msg = (id, values = {}) => (props.intl.formatMessage({id}, values))

  const onSortChange = (field, order) => {
    props.setSorting([{field, order}])
  }

  const onPageChange = page => {
    props.changePage(page)
  }

  const handleRowClick = entity => {
    if (props.onRowClick) {
      props.onRowClick(entity.__key)
    }
  }

  const sortingOptions = () => (
    (Array.isArray(props.sorting) && props.sorting.length >= 1) ? {
      sortName: props.sorting[0].field,
      sortOrder: props.sorting[0].order
    } : {}
  )

  const renderShowsTotal = (start, to, total) => {
    if (total === 0) return <span/>
    return (
      <span>
        {msg('client.entity-list.total', {start, to, total})}
      </span>
    )
  }

  const handleAllSelectionChange = (isSelected, rows) => {
    const keys = rows.map(r => r.__key)
    if (props.onSelectChange) {
      props.onSelectChange(keys, isSelected)
    }
  }

  const handleSelectionChange = (row, isSelected) => {
    if (props.onSelectChange) {
      props.onSelectChange([row.__key], isSelected)
    }
  }

  const getSelectionMode = () =>
    (props.tableSelectionStyle && props.tableSelectionStyle !== selectionStyles.NONE)
      ? props.tableSelectionStyle === selectionStyles.SINGLE
        ? {mode: 'radio'}
        : {mode: 'checkbox'}
      : {}

  const selectRow = {
    ...(getSelectionMode()),
    onSelect: handleSelectionChange,
    onSelectAll: handleAllSelectionChange,
    selected: props.selection ? props.selection : [],
    className: 'selected'
  }

  const tableOption = {
    onSortChange: onSortChange,
    sizePerPage: props.limit,
    onPageChange: onPageChange,
    page: props.currentPage,
    paginationShowsTotal: renderShowsTotal,
    paginationSize: 3,
    hideSizePerPage: true,
    onRowClick: handleRowClick,
    noDataText: props.inProgress
      ? msg('client.entity-list.dataLoading')
      : msg('client.entity-list.noData'),
    nextPageTitle: msg('client.entity-list.nextPageTitle'),
    prePageTitle: msg('client.entity-list.prePageTitle'),
    firstPageTitle: msg('client.entity-list.firstPageTitle'),
    lastPageTitle: msg('client.entity-list.lastPageTitle'),
    prePage: '‹',
    nextPage: '›',
    firstPage: '«',
    lastPage: '»',
    ...sortingOptions()
  }

  const showPagination = props.entityCount - props.limit > 0 && !props.inProgress

  const cellFormatter = (column, idx) => (cell, entity) => (
    <span key={idx} data-cy="list-cell">
      {column.children.map(child => cellRenderer(child, entity, props.parent, {refresh: props.refresh}, props.intl))}
    </span>
  )

  return (
    <StyledTable>
      {props.sorting
      && <BootstrapTable
        remote
        data={props.inProgress ? [] : props.entities}
        pagination={showPagination}
        fetchInfo={{dataTotalSize: props.entityCount}}
        options={tableOption}
        trClassName="break-word pointer"
        striped
        hover
        bordered={false}
        selectRow={selectRow}
      >
        <TableHeaderColumn dataField="__key" isKey hidden>Key</TableHeaderColumn>
        {
          props.columnDefinitions.map((column, idx) => {
            const field = column.children[0]
            return <TableHeaderColumn
              key={idx}
              dataFormat={cellFormatter(column, idx)}
              dataSort={column.sortable}
              dataField={field.path || field.id}
              {...RIGHT_ALIGNED_TYPES.includes(field.dataType) && {dataAlign: 'right'}}
            >
              {column.label}
            </TableHeaderColumn>
          })
        }
      </BootstrapTable>
      }
    </StyledTable>
  )
}

Table.propTypes = {
  intl: intlShape.isRequired,
  columnDefinitions: PropTypes.arrayOf(
    PropTypes.shape({
      values: PropTypes.arrayOf(PropTypes.shape({name: PropTypes.string})),
      label: PropTypes.string,
      order: PropTypes.int,
      sortable: PropTypes.bool
    })
  ).isRequired,
  entities: PropTypes.array.isRequired,
  entityCount: PropTypes.number,
  inProgress: PropTypes.bool,
  sorting: PropTypes.arrayOf(PropTypes.shape({field: PropTypes.string, order: PropTypes.string})),
  currentPage: PropTypes.number,
  limit: PropTypes.number,
  onRowClick: PropTypes.func,
  setSorting: PropTypes.func,
  changePage: PropTypes.func.isRequired,
  tableSelectionStyle: selectionStylePropType,
  onSelectChange: PropTypes.func,
  refresh: PropTypes.func,
  selection: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  parent: PropTypes.shape({
    key: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    reverseRelationName: PropTypes.string
  })
}

export default Table

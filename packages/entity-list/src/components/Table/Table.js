import React from 'react'
import PropTypes from 'prop-types'
import {intlShape} from 'react-intl'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import {FormattedValue} from 'tocco-ui'
import {actions} from 'tocco-util'
import '!style-loader!css-loader!react-bootstrap-table/dist/react-bootstrap-table.min.css'

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
      props.onSelectChange({keys: keys, isSelected})
    }
  }

  const handleSelectionChange = (row, isSelected) => {
    if (props.onSelectChange) {
      props.onSelectChange({keys: [row.__key], isSelected})
    }
  }

  const selectRow = {
    mode: props.selectable ? 'checkbox' : 'none',
    onSelect: handleSelectionChange,
    onSelectAll: handleAllSelectionChange,
    selected: props.selection ? props.selection : []
  }

  const tableOption = {
    onSortChange: onSortChange,
    sizePerPage: props.limit,
    onPageChange: onPageChange,
    page: props.currentPage,
    paginationShowsTotal: renderShowsTotal,
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

  const cellFormatter = (column, idx) => (cell, entity) => {
    return <span key={idx}>{
      column.children.map(child => {
        const {name} = child
        const columnType = child.type

        if (actions.isAction(columnType)) {
          return (
            <actions.Action
              key={'tableAction' + idx}
              definition={child}
              ids={[entity.__key]}
              entity={entity.__model}
            />
          )
        }

        const a = entity[name]

        const {type, value} = a
        return <span key={name} style={{marginRight: '2px'}}> <FormattedValue type={type} value={value}/></span>
      })
    }
    </span>
  }

  return (
    <div className="entity-table">
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
          props.columnDefinitions.map((column, idx) => (
            <TableHeaderColumn
              key={idx}
              dataFormat={cellFormatter(column, idx)}
              dataSort={column.sortable}
              dataField={column.children[0].name}
            >
              {column.label}
            </TableHeaderColumn>
          ))
        }
      </BootstrapTable>
      }
    </div>
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
  selectable: PropTypes.bool,
  onSelectChange: PropTypes.func,
  selection: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
}

export default Table

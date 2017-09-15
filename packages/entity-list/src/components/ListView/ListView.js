import PropTypes from 'prop-types'
import React from 'react'
import {intlShape} from 'react-intl'
import {FormattedValue} from 'tocco-ui'
import LoadMask from 'tocco-ui/src/LoadMask/LoadMask'
import ActionBarContainer from '../../containers/ActionBarContainer'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import '!style-loader!css-loader!react-bootstrap-table/dist/react-bootstrap-table.min.css'

class ListView extends React.Component {
  componentWillMount = () => {
    this.props.initialize()
  }

  msg = (id, values = {}) => (this.props.intl.formatMessage({id}, values))

  onOrderByChange = (name, direction) => {
    this.props.setOrderBy({name, direction})
  }

  onPageChange = page => {
    this.props.changePage(page)
  }

  handleRowClick = entity => {
    if (this.props.onRowClick) {
      this.props.onRowClick(entity.__key)
    }
  }

  renderShowsTotal = (start, to, total) => {
    if (total === 0) return <span/>
    return (
      <span>
        {this.msg('client.entity-list.total', {start, to, total})}
      </span>
    )
  }

  cellFormatter = cell => (cell ? <FormattedValue type={cell.type} value={cell.value}/> : <span/>)

  render() {
    const props = this.props

    const tableOption = {
      onSortChange: this.onOrderByChange,
      sizePerPage: this.props.limit,
      onPageChange: this.onPageChange,
      page: props.currentPage,
      paginationShowsTotal: this.renderShowsTotal,
      hideSizePerPage: true,
      onRowClick: this.handleRowClick,
      noDataText: props.inProgress
        ? this.msg('client.entity-list.dataLoading')
        : this.msg('client.entity-list.noData'),
      nextPageTitle: this.msg('client.entity-list.nextPageTitle'),
      prePageTitle: this.msg('client.entity-list.prePageTitle'),
      firstPageTitle: this.msg('client.entity-list.firstPageTitle'),
      lastPageTitle: this.msg('client.entity-list.lastPageTitle'),
      prePage: '‹',
      nextPage: '›',
      firstPage: '«',
      lastPage: '»'
    }

    const selectRow = {
      mode: 'none',
      clickToSelect: true
    }

    const showPagination = props.entityCount - props.limit > 0 && !props.inProgress

    return (
      <div className="list-view">
        <LoadMask
          required={[(props.columnDefinitions.length > 0)]}
          loadingText={this.msg('client.entity-list.loadingText')}
        >
          <ActionBarContainer/>
          <BootstrapTable
            remote
            data={props.inProgress ? [] : props.entities}
            pagination={ showPagination }
            fetchInfo={{dataTotalSize: props.entityCount}}
            options={tableOption}
            selectRow={selectRow}
            trClassName="break-word pointer"
            striped
            hover
            bordered={false}
          >
            <TableHeaderColumn dataField="__key" isKey hidden>Key</TableHeaderColumn>
            {
              props.columnDefinitions.map((column, idx) => (
                <TableHeaderColumn
                  key={idx}
                  dataFormat={this.cellFormatter}
                  dataSort={column.sortable}
                  dataField={column.child.name}
                >
                  {column.label}
                </TableHeaderColumn>
              ))
            }
          </BootstrapTable>
        </LoadMask>
      </div>
    )
  }
}

ListView.propTypes = {
  intl: intlShape.isRequired,
  initialize: PropTypes.func.isRequired,
  changePage: PropTypes.func.isRequired,
  entities: PropTypes.array.isRequired,
  orderBy: PropTypes.shape({
    name: PropTypes.string,
    direction: PropTypes.string
  }),
  redirect: PropTypes.func,
  currentPage: PropTypes.number,
  limit: PropTypes.number,
  columnDefinitions: PropTypes.arrayOf(
    PropTypes.shape({
      values: PropTypes.arrayOf(PropTypes.shape({name: PropTypes.string})),
      label: PropTypes.string,
      order: PropTypes.int,
      sortable: PropTypes.bool
    })
  ).isRequired,
  entityCount: PropTypes.number,
  setOrderBy: PropTypes.func,
  refresh: PropTypes.func,
  inProgress: PropTypes.bool,
  onRowClick: PropTypes.func
}

export default ListView

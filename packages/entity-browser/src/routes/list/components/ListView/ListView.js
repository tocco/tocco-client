import React from 'react'
import {intlShape} from 'react-intl'
import {Button, FormattedValue, Pagination, Table} from 'tocco-ui'
import SearchFormContainer from '../../containers/SearchFormContainer'

class ListView extends React.Component {
  componentWillMount() {
    this.props.initialize()
  }

  onOrderByChange = orderBy => {
    this.props.setOrderBy(orderBy)
  }

  onPageChange = page => {
    this.props.changePage(page)
  }

  cellRenderer = (values, entity) => {
    const formattedValues = values.map((v, idx) => (
      <FormattedValue key={idx} type={v.type} value={v.value}/>
    ))

    if (formattedValues.length > 0) {
      return (
        <span>
          {formattedValues.reduce((prev, curr) => [prev, ', ', curr])}
        </span>
      )
    }
  }

  handleRowClick = entityId => {
    this.props.router.push(`/detail/${entityId}`)
  }

  msg = id => (this.props.intl.formatMessage({id}))

  render() {
    const props = this.props
    return (
      <div>
        {props.showSearchForm && <SearchFormContainer/>}
        <div className="list-view">
          <Table
            columnDefinitions={props.columnDefinitions}
            records={props.entities}
            className="table-striped"
            onOrderByChange={this.onOrderByChange}
            orderBy={props.orderBy}
            loading={props.inProgress}
            cellRenderer={this.cellRenderer}
            onRowClick={this.handleRowClick}
          />
          <Pagination
            totalRecords={props.entityCount}
            recordsPerPage={props.limit}
            onPageChange={this.onPageChange}
            currentPage={props.currentPage}
          />
          <Button
            onClick={props.refresh}
            label={this.msg('client.entity-browser.refresh')}
            icon="glyphicon-refresh"
            className="refresh-button"
          />
        </div>
      </div>
    )
  }
}

ListView.propTypes = {
  intl: intlShape.isRequired,
  initialize: React.PropTypes.func.isRequired,
  router: React.PropTypes.object.isRequired,
  changePage: React.PropTypes.func.isRequired,
  entities: React.PropTypes.array.isRequired,
  showSearchForm: React.PropTypes.bool,
  orderBy: React.PropTypes.shape({
    name: React.PropTypes.string,
    direction: React.PropTypes.string
  }),
  redirect: React.PropTypes.func,
  currentPage: React.PropTypes.number,
  limit: React.PropTypes.number,
  columnDefinitions: React.PropTypes.arrayOf(
    React.PropTypes.shape(
      {
        value: React.PropTypes.oneOfType([
          React.PropTypes.string,
          React.PropTypes.arrayOf(React.PropTypes.string)
        ]).isRequired,
        label: React.PropTypes.string,
        order: React.PropTypes.int
      }
    )
  ).isRequired,
  entityCount: React.PropTypes.number,
  setOrderBy: React.PropTypes.func,
  refresh: React.PropTypes.func,
  inProgress: React.PropTypes.bool
}

export default ListView

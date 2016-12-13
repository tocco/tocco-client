import React from 'react'
import * as ToccoUI from 'tocco-ui'
import './styles.scss'
import {SearchForm} from './../SearchForm'

export class EntityBrowser extends React.Component {
  constructor(props) {
    super()
    props.initializeTable()
  }

  onOrderByChange = orderBy => {
    this.props.setOrderBy(orderBy)
  }

  onPageChange = page => {
    this.props.changePage(page)
  }

  cellRenderer = (values, record) => {
    const formattedValues = values.map((v, idx) => (
      <ToccoUI.FormattedValue key={idx} type={v.type} value={v.value}/>
    ))

    if (formattedValues.length > 0) {
      return (
        <span>
          {formattedValues.reduce((prev, curr) => [prev, ', ', curr])}
        </span>
      )
    }
  }

  render() {
    const props = this.props

    return (
      <div className="entity-browser">
        <SearchForm
          formDefinition={props.searchFormDefinition}
          setSearchTerm={props.setSearchTerm}
        />
        <ToccoUI.Table
          columnDefinitions={props.columnDefinitions}
          records={props.records}
          className="table-striped"
          onOrderByChange={this.onOrderByChange}
          orderBy={props.orderBy}
          loading={props.recordRequestInProgress}
          cellRenderer={this.cellRenderer}
        />
        <ToccoUI.Pagination
          totalRecords={props.recordCount}
          recordsPerPage={props.limit}
          onPageChange={this.onPageChange}
          currentPage={props.currentPage}
        />
        <ToccoUI.Button
          onClick={props.refresh}
          icon="glyphicon-refresh"
          className="refresh-button"
        >
          Reset
        </ToccoUI.Button>
      </div>
    )
  }
}

EntityBrowser.propTypes = {
  initializeTable: React.PropTypes.func.isRequired,
  changePage: React.PropTypes.func.isRequired,
  records: React.PropTypes.array.isRequired,
  searchFormDefinition: React.PropTypes.array.isRequired,
  orderBy: React.PropTypes.object.isRequired,
  setSearchTerm: React.PropTypes.func.isRequired,
  currentPage: React.PropTypes.number,
  limit: React.PropTypes.number,
  columnDefinitions: React.PropTypes.array,
  recordCount: React.PropTypes.number,
  setOrderBy: React.PropTypes.func,
  refresh: React.PropTypes.func,
  recordRequestInProgress: React.PropTypes.bool
}

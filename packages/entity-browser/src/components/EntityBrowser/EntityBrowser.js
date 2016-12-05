import React from 'react'
import * as ToccoUI from 'tocco-ui'
import './styles.scss'
import {SearchForm} from './SearchForm'

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

  cellRenderer = (field, record) => {
    if (field && field.value) {
      return <span>{field.value.toString()}</span>
    }

    return <span>_</span>
  }

  render() {
    const props = this.props

    return (
      <div className="entity-browser">

        <h1>EntityBrowser</h1>

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
        <button onClick={props.resetDataSet}>Reset</button>
      </div>
    )
  }
}

EntityBrowser.propTypes = {
  initializeTable: React.PropTypes.func.isRequired,
  changePage: React.PropTypes.func.isRequired,
  records: React.PropTypes.array,
  currentPage: React.PropTypes.number,
  limit: React.PropTypes.number,
  searchFormDefinition: React.PropTypes.array,
  columnDefinitions: React.PropTypes.array,
  recordCount: React.PropTypes.number,
  setOrderBy: React.PropTypes.func,
  orderBy: React.PropTypes.object.isRequired,
  resetDataSet: React.PropTypes.func,
  recordRequestInProgress: React.PropTypes.bool,
  setSearchTerm: React.PropTypes.func
}

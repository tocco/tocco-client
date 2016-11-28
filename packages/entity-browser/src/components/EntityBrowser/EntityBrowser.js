import React from 'react'
import * as ToccoUI from 'tocco-ui'
import './styles.scss'

export class EntityBrowser extends React.Component {
  constructor(props) {
    super()
    props.initializeTable()
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

        <ToccoUI.Table
          columnDefinitions={props.columnDefinitions}
          records={props.records}
          className="table-striped"
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
  columnDefinitions: React.PropTypes.array,
  recordCount: React.PropTypes.number,
  setCurrentPage: React.PropTypes.func,
  resetDataSet: React.PropTypes.func,
  recordRequestInProgress: React.PropTypes.bool
}

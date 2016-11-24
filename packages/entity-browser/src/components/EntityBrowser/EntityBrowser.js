import React from 'react'
import * as ToccoUI from 'tocco-ui'
import './styles.scss'

export class EntityBrowser extends React.Component {
  constructor(props) {
    super()
    props.initializeTable()
  }

  onPageChange = page => {
    this.props.setCurrentPage(page)
    this.props.requestRecords()
  }

  render() {
    const props = this.props

    return (
      <div className="entity-browser">
        <h1>EntityBrowser</h1>
        <ToccoUI.Table columnDefinitions={props.columnDefinitions} records={props.records} className="table-striped"/>
        <ToccoUI.Pagination
          totalRecords={props.recordCount}
          recordsPerPage={25}
          onPageChange={this.onPageChange}/>
      </div>
    )
  }
}

EntityBrowser.propTypes = {
  initializeTable: React.PropTypes.func.isRequired,
  requestRecords: React.PropTypes.func.isRequired,
  records: React.PropTypes.array,
  currentPage: React.PropTypes.number,
  columnDefinitions: React.PropTypes.array,
  recordCount: React.PropTypes.number,
  setCurrentPage: React.PropTypes.func
}

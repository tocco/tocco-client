import React from 'react'
import {intlShape} from 'react-intl'
import * as ToccoUI from 'tocco-ui'
import './styles.scss'

export class ListView extends React.Component {
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
      <div className="list-view">
        <ToccoUI.Table
          columnDefinitions={props.columnDefinitions}
          records={props.records}
          className="table-striped"
          onOrderByChange={this.onOrderByChange}
          orderBy={props.orderBy}
          loading={props.inProgress}
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
          label={this.msg('client.entity-browser.refresh')}
          icon="glyphicon-refresh"
          className="refresh-button"
        />
      </div>
    )
  }
}

ListView.propTypes = {
  intl: intlShape.isRequired,
  changePage: React.PropTypes.func.isRequired,
  records: React.PropTypes.array.isRequired,
  orderBy: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    direction: React.PropTypes.string.isRequired
  }),
  onRecordClick: React.PropTypes.func.isRequired,
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
  recordCount: React.PropTypes.number,
  setOrderBy: React.PropTypes.func,
  refresh: React.PropTypes.func,
  inProgress: React.PropTypes.bool
}

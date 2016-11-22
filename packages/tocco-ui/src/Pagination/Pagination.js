import React from 'react'
import _debounce from 'lodash/debounce'
import './styles.scss'

/**
 *  Pagination component
 */
class Pagination extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      currentPage: 1,
      totalPages: Math.ceil(props.totalRecords / props.recordsPerPage)
    }

    this.callOnPageChanged = _debounce(this.callOnPageChanged, 800)
  }

  onLastPage = () => this.state.currentPage >= this.state.totalPages
  onFirstPage = () => this.state.currentPage <= 1

  updateCurrentPage = val => {
    this.setState({...this.state, 'currentPage': val})

    this.callOnPageChanged()
  }

  handleOneForward = () => {
    if (!this.onLastPage()) {
      this.updateCurrentPage(this.state.currentPage + 1)
    }
  }

  handleOneBack = () => {
    if (!this.onFirstPage()) {
      this.updateCurrentPage(this.state.currentPage - 1)
    }
  }

  handleToLast = () => {
    if (!this.onLastPage()) {
      this.updateCurrentPage(this.state.totalPages)
    }
  }

  handleToFirst = () => {
    if (!this.onFirstPage()) {
      this.updateCurrentPage(1)
    }
  }

  handleInputUpdate = event => {
    let value = parseInt(event.target.value)

    if (value < 0) {
      value = 0
    }
    if (value > this.state.totalPages) {
      value = this.state.totalPages
    }

    this.updateCurrentPage(value)
  }

  callOnPageChanged = () => {
    if (this.props.onPageChange) {
      this.props.onPageChange(this.state.currentPage)
    }
  }

  render() {
    const approximateWidth = this.state.totalPages.toString().length * 8 + 10

    return (
      <div className="tocco-pagination">
        <button
          id="toFirstButton"
          type="button"
          className="btn"
          onClick={this.handleToFirst}
          disabled={this.onFirstPage()}
        >
          <span className="glyphicon glyphicon-fast-backward"/>
        </button>
        <button
          id="backButton"
          type="button"
          className="btn"
          onClick={this.handleOneBack}
          disabled={this.onFirstPage()}
        >
          <span className="glyphicon glyphicon-step-backward"/>
        </button>
        {
          this.props.noInput
          && <span id="currentPage">{this.state.currentPage}</span>
        }
        {
          !this.props.noInput
          && <input
            id="currentPage"
            type="number"
            min="1"
            max="20"
            onChange={this.handleInputUpdate}
            style={{width: `${approximateWidth}px`}}
            value={this.state.currentPage}
          />
        }
        <span> / </span><span id="total">{this.state.totalPages}</span>
        <button
          id="forwardButton"
          type="button"
          className="btn"
          onClick={this.handleOneForward}
          disabled={this.onLastPage()}
        >
          <span className="glyphicon glyphicon-step-forward"/>
        </button>
        <button
          id="toLastButton"
          type="button"
          className="btn"
          onClick={this.handleToLast}
          disabled={this.onLastPage()}
        >
          <span className="glyphicon glyphicon-fast-forward"/>
        </button>
      </div>
    )
  }
}

Pagination.propTypes = {
  /**
   * Total amount of records (is used to calculate numbers of pages)
   */
  totalRecords: React.PropTypes.number.isRequired,
  /**
   * Amount of records that are shown on one page (is used to calculate numbers of pages)
   */
  recordsPerPage: React.PropTypes.number.isRequired,
  /**
   * Get called everytime the current page changes. Given the current number as first argument.
   */
  onPageChange: React.PropTypes.func,
  /**
   * If set to false (default true) a label, instead of a input field to enter page, is displayed.
   */
  noInput: React.PropTypes.bool
}

export default Pagination

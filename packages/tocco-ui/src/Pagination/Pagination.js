import PropTypes from 'prop-types'
import React from 'react'
import _debounce from 'lodash/debounce'

import Button from '../Button'

/**
 *  Pagination component
 */
class Pagination extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPage: props.currentPage || 1,
      totalPages: Math.ceil(props.totalRecords / props.recordsPerPage)
    }

    this.callOnPageChanged = _debounce(this.callOnPageChanged, 200)
  }

  componentWillReceiveProps = nextProps => {
    if (this.props.totalRecords !== nextProps.totalRecords
      || this.props.recordsPerPage !== nextProps.recordsPerPage) {
      this.setState({
        ...this.state,
        totalPages: Math.ceil(nextProps.totalRecords / nextProps.recordsPerPage)
      })
    }

    if (this.props.currentPage !== nextProps.currentPage) {
      this.setState({
        ...this.state,
        currentPage: nextProps.currentPage
      })
    }
  }

  isOnLastPage = () => this.state.currentPage >= this.state.totalPages
  isOnFirstPage = () => this.state.currentPage <= 1

  updateCurrentPage = (val, notify = true) => {
    this.setState({...this.state, 'currentPage': val})

    if (notify) {
      this.callOnPageChanged()
    }
  }

  handleOneForwardClick = () => {
    if (!this.isOnLastPage()) {
      this.updateCurrentPage(this.state.currentPage + 1)
    }
  }

  handleOneBackClick = () => {
    if (!this.isOnFirstPage()) {
      this.updateCurrentPage(this.state.currentPage - 1)
    }
  }

  handleToLastClick = () => {
    if (!this.isOnLastPage()) {
      this.updateCurrentPage(this.state.totalPages)
    }
  }

  handleToFirstClick = () => {
    if (!this.isOnFirstPage()) {
      this.updateCurrentPage(1)
    }
  }

  handleInputUpdate = event => {
    let value = parseInt(event.target.value)

    if (value < 1) {
      value = 1
    }
    if (value > this.state.totalPages) {
      value = this.state.totalPages
    }

    this.updateCurrentPage(value, false)
  }

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.callOnPageChanged()
    }
  }

  handleOnInputBlur = () => {
    this.callOnPageChanged()
  }

  callOnPageChanged = () => {
    if (this.props.onPageChange && !isNaN(this.state.currentPage)) {
      this.props.onPageChange(this.state.currentPage)
    }
  }

  render() {
    const figuresCount = this.state.totalPages.toString().length
    return (
      <span className="tocco-pagination">
        <Button
          id="toFirstButton"
          onClick={this.handleToFirstClick}
          disabled={this.isOnFirstPage()}
          icon="glyphicon-fast-backward"
        />
        <Button
          id="backButton"
          onClick={this.handleOneBackClick}
          disabled={this.isOnFirstPage()}
          icon="glyphicon-triangle-left"
        />
        {
          this.props.noInput
          && <span className="tocco-pagination-current-page" id="currentPage">{this.state.currentPage}</span>
        }
        {
          !this.props.noInput
          && <input
            className="tocco-pagination-current-page form-control"
            id="currentPage"
            type="number"
            min="1"
            max={this.state.totalPages}
            onChange={this.handleInputUpdate}
            size={figuresCount}
            value={this.state.currentPage}
            onKeyPress={this.handleKeyPress}
            onBlur={this.handleOnInputBlur}

          />
        }
        <span className="tocco-pagination-total-pages" id="total">{this.state.totalPages}</span>
        <Button
          id="forwardButton"
          onClick={this.handleOneForwardClick}
          disabled={this.isOnLastPage()}
          icon="glyphicon-triangle-right"
        />
        <Button
          id="toLastButton"
          onClick={this.handleToLastClick}
          disabled={this.isOnLastPage()}
          icon="glyphicon-fast-forward"
        />
      </span>
    )
  }
}

Pagination.propTypes = {
  /**
   * Total amount of records (is used to calculate numbers of pages)
   */
  totalRecords: PropTypes.number.isRequired,
  /**
   * Amount of records that are shown on one page (is used to calculate numbers of pages)
   */
  recordsPerPage: PropTypes.number.isRequired,
  /**
   * Get called everytime the current page changes. Given the current number as first argument.
   */
  onPageChange: PropTypes.func,
  /**
   * If set to false (default true) a label, instead of an input field to enter page, is displayed.
   */
  currentPage: PropTypes.number,
  /**
   * If set to false (default true) a label, instead of an input field to enter page, is displayed.
   */
  noInput: PropTypes.bool
}

export default Pagination

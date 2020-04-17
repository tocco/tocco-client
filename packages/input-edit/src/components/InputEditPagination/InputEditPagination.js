import {Pagination} from 'tocco-ui'
import PropTypes from 'prop-types'
import React from 'react'

const InputEditPagination = ({count, currentPage, recordsPerPage, setCurrentPage}) => {
  return count && currentPage
    ? <Pagination
      totalCount={count}
      currentPage={currentPage}
      recordsPerPage={recordsPerPage}
      onPageChange={setCurrentPage}/>
    : null
}

InputEditPagination.propTypes = {
  count: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  recordsPerPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired
}

export default InputEditPagination

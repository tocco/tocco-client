import React from 'react'
import PropTypes from 'prop-types'

const SearchPanel = props => {
  return (
    <div>
      <h1>Search Panel</h1>
      {JSON.stringify(props.calendarTypes)}
    </div>
  )
}

SearchPanel.propTypes = {
  calendarTypes: PropTypes.object
}

export default SearchPanel

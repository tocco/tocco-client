import React from 'react'
import PropTypes from 'prop-types'

import MultiSelect from './MultiSelect'
import SingleSelect from './SingleSelect'

const SearchFilterEdit = props => {
  if (props.options.multi) {
    return <MultiSelect {...props}/>
  } else {
    return <SingleSelect {...props}/>
  }
}

SearchFilterEdit.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.shape({
      key: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ])
    }),
    PropTypes.array
  ]),
  options: PropTypes.shape({
    multi: PropTypes.bool,
    store: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.any,
        label: PropTypes.string
      }))
  }).isRequired,
  readOnly: PropTypes.bool,
  id: PropTypes.string
}

export default SearchFilterEdit

import PropTypes from 'prop-types'
import React from 'react'

const LazyDataEnhancer = ({value, children}) => React.cloneElement(children, {value})

LazyDataEnhancer.propTypes = {
  children: PropTypes.node,
  value: PropTypes.any
}

export default LazyDataEnhancer

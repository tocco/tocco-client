import React from 'react'
import PropTypes from 'prop-types'

const LazyDataEnhancer = ({value, children}) => React.cloneElement(children, {value})

LazyDataEnhancer.propTypes = {
  children: PropTypes.node,
  value: PropTypes.any
}

export default LazyDataEnhancer

import PropTypes from 'prop-types'
import React from 'react'

import Link from '../../Link'

const UrlFormatter = props => (
  <Link href={props.value} label={props.value}/>
)

UrlFormatter.propTypes = {
  value: PropTypes.string
}

export default UrlFormatter

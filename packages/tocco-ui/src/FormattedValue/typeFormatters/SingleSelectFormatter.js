import PropTypes from 'prop-types'
import React from 'react'

import {Span} from '../../Typography'

const SingleSelectFormatter = props => (
  <Span>{props.value.display}</Span>
)

SingleSelectFormatter.propTypes = {
  value: PropTypes.object
}

export default SingleSelectFormatter

import PropTypes from 'prop-types'
import React from 'react'

import Typography from '../../Typography'
import ClickableWrapper from '../../Select/ClickableWrapper'

const SingleSelectFormatter = ({value, options = {}}) => {
  const display = <Typography.Span>{value.display}</Typography.Span>

  return options.linkFactory
    ? <ClickableWrapper onMouseDown={e => e.stopPropagation()}>
      {options.linkFactory(value.key, display)}
    </ClickableWrapper>
    : display
}

SingleSelectFormatter.propTypes = {
  value: PropTypes.object,
  options: PropTypes.shape({
    linkFactory: PropTypes.func
  })
}

export default SingleSelectFormatter

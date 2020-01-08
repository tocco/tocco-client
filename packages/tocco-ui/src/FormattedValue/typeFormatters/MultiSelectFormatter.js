import PropTypes from 'prop-types'
import React from 'react'

import Typography from '../../Typography'

export const MultiSeparator = () => ', '

const MultiSelectFormatter = ({value, options, breakWords}) => {
  return <Typography.Span breakWords={breakWords}>
    {value && value.length > 0
      ? value
        .map(v => options && options.linkFactory ? options.linkFactory(v.key, v.display) : v.display)
        .reduce((prev, curr, idx) => [prev, <MultiSeparator key={'sep' + idx}/>, curr])
      : null}
  </Typography.Span>
}

MultiSelectFormatter.propTypes = {
  value: PropTypes.array,
  options: PropTypes.shape({
    linkFactory: PropTypes.func
  }),
  breakWords: PropTypes.bool
}

export default MultiSelectFormatter

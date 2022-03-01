import PropTypes from 'prop-types'
import React from 'react'

import Typography from '../../Typography'

export const MultiSeparator = () => ', '

const MultiSelectFormatter = ({value, options, breakWords}) => {
  const {navigationStrategy, linkProps} = options || {}

  const mapValueToDisplay = value =>
    navigationStrategy?.DetailLink
      ? <span onClick={e => {
        e.stopPropagation()
        e.preventDefault()
      }}>
        <navigationStrategy.DetailLink {...linkProps} entityKey={value.key}>
          {value.display}
        </navigationStrategy.DetailLink>
      </span>
      : value.display

  const displays
    = value?.length > 0
      ? value.map(mapValueToDisplay).reduce((prev, curr, idx) => [prev, <MultiSeparator key={`sep${idx}`}/>, curr])
      : null

  return <Typography.Span breakWords={breakWords}>{displays}</Typography.Span>
}

MultiSelectFormatter.propTypes = {
  value: PropTypes.array,
  options: PropTypes.shape({
    navigationStrategy: PropTypes.object,
    linkProps: PropTypes.object
  }),
  breakWords: PropTypes.bool
}

export default MultiSelectFormatter

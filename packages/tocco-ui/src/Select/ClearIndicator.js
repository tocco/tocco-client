import React from 'react'
import PropTypes from 'prop-types'
import {injectIntl, intlShape} from 'react-intl'

import Ball from '../Ball'

const ClearIndicator = props => {
  const msg = id => props.intl.formatMessage({id})

  return (
    <span {...props.innerProps}>
      <Ball
        icon="times"
        tabIndex={-1}
        aria-label={msg('client.component.select.clearFieldLabel')}
      />
  </span>
  )
}

ClearIndicator.propTypes = {
  innerProps: PropTypes.object,
  intl: intlShape.isRequired
}

export default injectIntl(ClearIndicator)

import PropTypes from 'prop-types'
import React from 'react'

import conflicts from '../../utils/conflicts'

const CHECK = '\u2713'
const CROSS = '\u2715'

const Conflict = ({conflictStatus, intl}) => {
  if (!(conflictStatus === conflicts.ACCEPTED || conflictStatus === conflicts.EXISTING)) {
    return null
  }

  const accepted = conflictStatus === conflicts.ACCEPTED
  const textResource = `client.scheduler.conflict${accepted ? 'Accepted' : 'Existing'}`
  const icon = accepted ? CHECK : CROSS

  return (
    <span>
      {icon} {intl.formatMessage({id: textResource})}
    </span>
  )
}

Conflict.propTypes = {
  intl: PropTypes.object.isRequired,
  conflictStatus: PropTypes.oneOf(Object.values(conflicts))
}

export default Conflict

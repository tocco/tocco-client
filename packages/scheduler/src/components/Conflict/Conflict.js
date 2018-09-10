import React from 'react'
import PropTypes from 'prop-types'
import {intlShape} from 'react-intl'
import {Icon} from 'tocco-ui'

import conflicts from '../../utils/conflicts'

const Conflict = ({conflictStatus, intl}) => {
  if (!(conflictStatus === conflicts.ACCEPTED || conflictStatus === conflicts.EXISTING)) {
    return null
  }

  const accepted = conflictStatus === conflicts.ACCEPTED

  const textResource = `client.scheduler.conflict${accepted ? 'Accepted' : 'Existing'}`
  const style = {
    ...(accepted ? {} : {color: '#8b0000'})
  }

  return <span style={style}>
    <Icon icon={accepted ? 'check' : 'times'} position="prepend" />
    {intl.formatMessage({id: textResource})}
  </span>
}

Conflict.propTypes = {
  intl: intlShape.isRequired,
  conflictStatus: PropTypes.oneOf(Object.values(conflicts))
}

export default Conflict

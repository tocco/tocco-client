import PropTypes from 'prop-types'
import React from 'react'
import {FormattedMessage} from 'react-intl'

const PasswordMatchDisplay = props => {
  const message = (props.passwordRepeat && props.password !== props.passwordRepeat)
    ? <li className="text-danger"><FormattedMessage id="client.login.passwordUpdate.noMatch"/></li>
    : '\u00a0'

  return (
    <ul className="icon-list">
      {message}
    </ul>
  )
}

PasswordMatchDisplay.propTypes = {
  password: PropTypes.string.isRequired,
  passwordRepeat: PropTypes.string.isRequired
}

export default PasswordMatchDisplay

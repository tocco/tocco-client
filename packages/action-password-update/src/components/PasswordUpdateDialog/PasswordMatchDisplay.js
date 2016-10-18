import React from 'react'
import {FormattedMessage} from 'react-intl'

const PasswordMatchDisplay = props => {
  // TODO state should change immediately also if typing in other fields,
  // this field can only be valid if all other checks are fullfilled
  const message = (props.passwordRepeat && props.password !== props.passwordRepeat)
    ? <li className="text-danger"><FormattedMessage id="client.action.passwordUpdate.noMatch"/></li>
    : <li className="text-success"><FormattedMessage id="client.action.passwordUpdate.Match"/></li>
  return (
    <ul className="PasswordMatchDisplay icon-list">
      {message}
    </ul>
  )
}

PasswordMatchDisplay.propTypes = {
  password: React.PropTypes.string.isRequired,
  passwordRepeat: React.PropTypes.string.isRequired
}

export default PasswordMatchDisplay

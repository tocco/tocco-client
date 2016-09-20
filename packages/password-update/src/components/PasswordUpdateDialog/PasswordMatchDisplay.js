import React from 'react'
import {FormattedMessage} from 'react-intl';

const PasswordMatchDisplay = (props) => {
  const message = (props.passwordRepeat && props.password !== props.passwordRepeat)
    ? <FormattedMessage id="client.action.passwordUpdate.noMatch"/>
    : '\u00a0'

  return (
    <div className="PasswordMatchDisplay text-danger">
      {message}
    </div>
  )
}

PasswordMatchDisplay.propTypes = {
  password: React.PropTypes.string.isRequired,
  passwordRepeat: React.PropTypes.string.isRequired
}

export default PasswordMatchDisplay

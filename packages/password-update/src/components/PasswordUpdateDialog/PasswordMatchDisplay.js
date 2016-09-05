import React, {Component} from 'react'

const PasswordMatchDisplay = (props) => {
  const message = (props.passwordRepeat && props.password !== props.passwordRepeat)
    ? 'Die Passwörter stimmen nicht überein'
    : '\u00a0'

  return (
    <div className="PasswordMatchDisplay">
      {message}
    </div>
  )
}

PasswordMatchDisplay.propTypes = {
  password: React.PropTypes.string.isRequired,
  passwordRepeat: React.PropTypes.string.isRequired,
}

export default PasswordMatchDisplay

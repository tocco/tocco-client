import React from 'react'

function getMessage(errorCode) {
  switch (errorCode) {
    case 'INVALID_CREDENTIALS':
      return 'Das Passwort konnte nicht geändert werden. Das alte Passwort ist nicht korrekt.'
    default:
      return 'Das Passwort konnte nicht geändert werden.'
  }
}

const FailureMessage = (props) => (
  <div className="FailureMessage text-danger">{getMessage(props.errorCode)}</div>
)

FailureMessage.propTypes = {
  errorCode: React.PropTypes.string
}

export default FailureMessage

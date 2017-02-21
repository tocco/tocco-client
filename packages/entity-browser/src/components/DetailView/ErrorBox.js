import React from 'react'
import formErrorsUtil from '../../util/detailView/formErrors'

const ErrorBox = props => {
  const {formErrors} = props
  return (
    <div className="alert alert-danger" role="alert">
      {formErrorsUtil.hasFieldErrors(formErrors) && <a onClick={props.showErrors}>Ungültig Felder</a>}
      {formErrorsUtil.hasPathErrors(formErrors) && <div>
        <div>Folgende Relationen sind momentan ungültig:</div>
        <ul>
          {formErrorsUtil.getPathErrorsCompact(formErrors).map((message, idx) => {
            return <li key={idx}>{message}</li>
          })}
        </ul>
      </div>
      }
    </div>
  )
}

ErrorBox.propTypes = {
  formErrors: React.PropTypes.objectOf(
    React.PropTypes.objectOf(React.PropTypes.arrayOf(
      React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object])))
  ).isRequired,
  showErrors: React.PropTypes.func.isRequired
}

export default ErrorBox

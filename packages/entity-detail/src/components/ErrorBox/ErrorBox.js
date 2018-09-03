import PropTypes from 'prop-types'
import React from 'react'
import {FormattedMessage} from 'react-intl'
import {form} from 'tocco-util'

const ErrorBox = ({formErrors, showErrors}) => (
  <div>
    <div className="alert alert-danger" role="alert">
      <ul className="fa-ul">

        {form.formErrorsUtil.hasFieldErrors(formErrors)
          && <li className="fieldError">
            <a onClick={showErrors}>
              <i className="fa-li fa fa-exclamation-triangle"></i>
              <FormattedMessage id="client.entity-detail.invalidFieldsError"/>
              <i style={{marginLeft: '2px'}} className="fa fa-hand-o-up"></i>
            </a>
          </li>
        }

        {form.formErrorsUtil.hasValidatorErrors(formErrors)
          && <li>
            <i className="fa-li fa fa-exclamation-triangle"></i>
            <FormattedMessage id="client.entity-detail.validatorErrors"/>
            <ul>
              {form.formErrorsUtil.getValidatorErrors(formErrors).map((message, idx) => {
                return <li className="validationError" key={idx}>{message}</li>
              })}
            </ul>
          </li>
        }

        {form.formErrorsUtil.hasRelatedEntityErrors(formErrors)
          && <li>
            <i className="fa-li fa fa-exclamation-triangle"></i>
            <FormattedMessage id="client.entity-detail.invalidRelationErrors"/>
            <ul>
              {form.formErrorsUtil.getRelatedEntityErrorsCompact(formErrors).map((message, idx) => {
                return <li className="relationEntityError" key={idx}>{message}</li>
              })}
            </ul>
          </li>
        }
      </ul>
    </div>
  </div>
)

ErrorBox.propTypes = {
  formErrors: PropTypes.object,
  showErrors: PropTypes.func.isRequired
}

export default ErrorBox

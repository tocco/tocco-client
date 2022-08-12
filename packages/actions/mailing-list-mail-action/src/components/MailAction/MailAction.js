import PropTypes from 'prop-types'
import {useEffect} from 'react'
import {reduxForm} from 'redux-form'
import {form} from 'tocco-app-extensions'
import {LoadMask, Button} from 'tocco-ui'

import {StyledButtonWrapper} from '../StyledComponents'

export const REDUX_FORM_NAME = 'mailing-list-action'

const MailAction = ({formDefinition, loadFormDefinition, sendMail, validate, formValid, intl}) => {
  useEffect(() => {
    loadFormDefinition()
  }, [loadFormDefinition])

  const onSubmit = e => {
    e.preventDefault()
    e.stopPropagation()
    sendMail()
  }

  return (
    <LoadMask required={[formDefinition]}>
      <form onSubmit={onSubmit} onChange={validate}>
        <form.FormBuilder
          entity={undefined}
          formName={REDUX_FORM_NAME}
          formDefinition={formDefinition}
          fieldMappingType={'editable'}
          mode={'create'}
        />
        <StyledButtonWrapper>
          <Button
            disabled={!formValid}
            label={intl.formatMessage({id: 'client.actions.mailing-list-mail-action.submit'})}
            type="submit"
            look="raised"
            ink="primary"
          />
        </StyledButtonWrapper>
      </form>
    </LoadMask>
  )
}

MailAction.propTypes = {
  formDefinition: PropTypes.object,
  loadFormDefinition: PropTypes.func.isRequired,
  sendMail: PropTypes.func.isRequired,
  validate: PropTypes.func.isRequired,
  formValid: PropTypes.bool.isRequired,
  intl: PropTypes.object.isRequired
}

export default reduxForm({form: REDUX_FORM_NAME, destroyOnUnmount: false})(MailAction)

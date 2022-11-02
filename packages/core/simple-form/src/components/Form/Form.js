import PropTypes from 'prop-types'
import {useEffect} from 'react'
import {reduxForm} from 'redux-form'
import {form} from 'tocco-app-extensions'
import {Button} from 'tocco-ui'

import {StyledButtonsWrapper} from './StyledComponents'

const REDUX_FORM_NAME = 'simpleForm'

const Form = ({
  initializeForm,
  intl,
  onCancel,
  onSubmit,
  handleSubmit: handleSubmitProp,
  form: formName,
  formDefinition,
  formValues,
  mappingType,
  mode,
  noButtons,
  submitting,
  submitText,
  cancelText,
  beforeRenderField
}) => {
  const msg = id => intl.formatMessage({id})
  const handleCancel = () => onCancel()
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
  // delay closing of the window so it won't close immediately with the click
  const handleSubmit = () => sleep(400).then(() => onSubmit())

  useEffect(() => {
    initializeForm()
  }, [initializeForm])

  return (
    <form onSubmit={handleSubmitProp(handleSubmit)}>
      <form.FormBuilder
        entity={undefined}
        formName={formName}
        formDefinition={formDefinition}
        formValues={formValues}
        fieldMappingType={mappingType || 'editable'}
        mode={mode}
        beforeRenderField={beforeRenderField}
      />
      {!noButtons && (
        <StyledButtonsWrapper>
          <Button
            disabled={submitting}
            ink="primary"
            label={submitText || msg('client.simple-form.defaultOk')}
            pending={submitting}
            type="submit"
          />
          <Button
            disabled={submitting}
            label={cancelText || msg('client.simple-form.defaultCancel')}
            onClick={handleCancel}
          />
        </StyledButtonsWrapper>
      )}
    </form>
  )
}

Form.propTypes = {
  intl: PropTypes.object.isRequired,
  initializeForm: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  formDefinition: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
  cancelText: PropTypes.string,
  submitText: PropTypes.string,
  noButtons: PropTypes.bool,
  formValues: PropTypes.object,
  form: PropTypes.string,
  mappingType: PropTypes.oneOf(['editable', 'search', 'readonly']),
  mode: PropTypes.oneOf(['list', 'detail', 'create', 'update', 'search']),
  beforeRenderField: PropTypes.func
}

export default reduxForm({form: REDUX_FORM_NAME, destroyOnUnmount: false})(Form)

import PropTypes from 'prop-types'
import {useEffect, useRef} from 'react'
import {reduxForm} from 'redux-form'
import {form} from 'tocco-app-extensions'
import {SaveButton} from 'tocco-entity-detail/src/main'
import {react as customHooks} from 'tocco-util'

const AddressUpdate = ({
  entity,
  formDefinition,
  formValues,
  submitForm,
  intl,
  submitting,
  valid,
  anyTouched,
  fireTouched,
  dirty,
  formErrors,
  form: formName,
  mode
}) => {
  const readonly = !entity?.editable

  const formEl = useRef(null)

  customHooks.useAutofocus(formEl)
  const formEventProps = form.hooks.useFormEvents({submitForm})

  useEffect(() => {
    fireTouched(dirty && anyTouched)
  }, [dirty, anyTouched, fireTouched])

  const customRenderedActions = {
    save: actionDefinition =>
      readonly ? null : (
        <SaveButton
          intl={intl}
          submitting={submitting}
          mode={mode}
          hasErrors={!valid && anyTouched}
          formErrors={formErrors}
          {...actionDefinition}
        />
      )
  }

  return (
    <form {...formEventProps} ref={formEl}>
      <form.FormBuilder
        entity={entity}
        formName={formName}
        formDefinition={formDefinition}
        formValues={formValues}
        fieldMappingType="editable"
        mode={mode}
        readonly={readonly}
        customRenderedActions={customRenderedActions}
      />
    </form>
  )
}

AddressUpdate.propTypes = {
  intl: PropTypes.object.isRequired,
  formDefinition: PropTypes.object.isRequired,
  entity: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired,
  form: PropTypes.string.isRequired,
  submitForm: PropTypes.func.isRequired,
  fireTouched: PropTypes.func.isRequired,
  formValues: PropTypes.object,
  submitting: PropTypes.bool,
  formErrors: PropTypes.object,
  valid: PropTypes.bool,
  dirty: PropTypes.bool,
  anyTouched: PropTypes.bool
}

export default reduxForm({
  form: 'addressForm',
  destroyOnUnmount: false
})(AddressUpdate)

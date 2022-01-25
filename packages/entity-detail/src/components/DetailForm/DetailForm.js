import PropTypes from 'prop-types'
import React, {useEffect, useMemo, useRef} from 'react'
import {reduxForm} from 'redux-form'
import {form} from 'tocco-app-extensions'
import {react as customHooks} from 'tocco-util'

import DetailFooterContainer from '../../containers/DetailFooterContainer'
import SubGrid from '../../util/detailView/fromFieldFactories/subGrid'
import MarkButton from './MarkButton'
import SaveButton from './SaveButton'
import {StyledForm} from './StyledComponents'

const DetailForm = props => {
  const {
    fireTouched,
    dirty,
    intl,
    submitting,
    mode,
    formErrors,
    valid,
    submitForm,
    entity,
    formDefinition,
    formValues,
    anyTouched,
    form: formName
  } = props

  const formEl = useRef(null)

  useEffect(() => {
    fireTouched(dirty && anyTouched)
  }, [dirty, anyTouched, fireTouched])

  customHooks.useAutofocus(formEl)

  const customRenderedActions = useMemo(
    () => ({
      save: actionDefinition => (
        <SaveButton
          intl={intl}
          submitting={submitting}
          mode={mode}
          hasErrors={!valid && anyTouched}
          formErrors={formErrors}
          {...actionDefinition}
        />
      ),
      mark: actionDefinition => <MarkButton {...actionDefinition} />
    }),
    [submitting, mode, valid, anyTouched, formErrors, intl]
  )

  const handleSubmit = event => {
    event.preventDefault()
    submitForm()
  }

  const handleKeyPress = event => {
    if (event.key === 'Enter' && event.target.tagName !== 'TEXTAREA') {
      event.preventDefault() // disable save on enter key down
    }
  }

  return (
    <StyledForm onSubmit={handleSubmit} onKeyDown={handleKeyPress} ref={formEl}>
      <form.FormBuilder
        entity={entity}
        formName={formName}
        formDefinition={formDefinition}
        formValues={formValues}
        fieldMappingType={formDefinition.readOnly ? 'readonly' : 'editable'}
        mode={mode}
        componentMapping={{[form.componentTypes.SUB_TABLE]: SubGrid}}
        customRenderedActions={customRenderedActions}
      />
      <DetailFooterContainer />
    </StyledForm>
  )
}

DetailForm.propTypes = {
  intl: PropTypes.object.isRequired,
  mode: PropTypes.oneOf(['update', 'create']),
  submitForm: PropTypes.func.isRequired,
  formDefinition: PropTypes.object.isRequired,
  entity: PropTypes.object.isRequired,
  form: PropTypes.string.isRequired,
  touch: PropTypes.func.isRequired,
  formValues: PropTypes.object,
  submitting: PropTypes.bool,
  formErrors: PropTypes.object,
  valid: PropTypes.bool,
  dirty: PropTypes.bool,
  lastSave: PropTypes.number,
  fireTouched: PropTypes.func.isRequired,
  anyTouched: PropTypes.bool
}

export default reduxForm({
  form: 'detailForm',
  destroyOnUnmount: false
})(DetailForm)

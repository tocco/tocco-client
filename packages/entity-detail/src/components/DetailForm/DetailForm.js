import PropTypes from 'prop-types'
import React, {useEffect, useLayoutEffect, useMemo, useRef} from 'react'
import {reduxForm} from 'redux-form'
import {intlShape} from 'react-intl'
import {form} from 'tocco-app-extensions'
import {scale} from 'tocco-ui'
import styled from 'styled-components'

import SubGrid from '../../util/detailView/fromFieldFactories/subGrid'
import SaveButton from './SaveButton'

const StyledForm = styled.form`
  display: grid;
  padding-bottom: ${scale.space(-0.5)};
`

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

  const formEl = useRef()

  useEffect(() => {
    fireTouched(dirty)
  }, [dirty])

  useLayoutEffect(() => {
    const firstInput = formEl.current.querySelector('input:not([disabled])')
    if (firstInput != null) {
      firstInput.focus()
    }
  }, [])

  const customActions = useMemo(() => (
    {
      save: () =>
        <SaveButton
          intl={intl}
          submitting={submitting}
          mode={mode}
          hasErrors={!valid && anyTouched}
          formErrors={formErrors}
        />
    }
  ), [submitting, mode, valid, anyTouched, formErrors])

  const handleSubmit = event => {
    event.preventDefault()
    submitForm()
  }

  const handleKeyPress = event => {
    if (event.key === 'Enter' && event.target.tagName !== 'TEXTAREA') {
      event.preventDefault() // disable save on enter key down
    }
  }

  return <StyledForm
    onSubmit={handleSubmit}
    onKeyDown={handleKeyPress}
    ref={formEl}
  >
    <form.FormBuilder
      entity={entity}
      formName={formName}
      formDefinition={formDefinition}
      formValues={formValues}
      fieldMappingType={formDefinition.readOnly ? 'readonly' : 'editable'}
      mode={mode}
      componentMapping={{[form.componentTypes.SUB_TABLE]: SubGrid}}
      customActions={customActions}
    />

  </StyledForm>
}

DetailForm.propTypes = {
  intl: intlShape.isRequired,
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

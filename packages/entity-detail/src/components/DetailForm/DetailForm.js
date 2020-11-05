import PropTypes from 'prop-types'
import React, {useEffect, useMemo} from 'react'
import {reduxForm} from 'redux-form'
import {intlShape} from 'react-intl'
import {form} from 'tocco-app-extensions'
import styled from 'styled-components'

import SubGrid from '../../util/detailView/fromFieldFactories/subGrid'
import SaveButton from './SaveButton'

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
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

  useEffect(() => {
    fireTouched(dirty)
  }, [dirty])

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

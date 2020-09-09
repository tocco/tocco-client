import PropTypes from 'prop-types'
import React, {useEffect, useMemo} from 'react'
import {reduxForm} from 'redux-form'
import {intlShape} from 'react-intl'
import {form} from 'tocco-app-extensions'
import styled from 'styled-components'

import SubGrid from '../../util/detailView/fromFieldFactories/subGrid'
import ErrorBox from '../ErrorBox'
import SaveButton from './SaveButton'

const StyledForm = styled.form`
  display: block;
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
    touchAllFields,
    entity,
    entityModel,
    formDefinition,
    formValues,
    anyTouched
  } = props

  useEffect(() => {
    fireTouched(dirty)
  }, [dirty])

  const customActions = useMemo(() => (
    {
      save: () => <SaveButton intl={intl} submitting={submitting} mode={mode}/>
    }
  ), [submitting, mode])

  const focusErrorFields = () => {
    const firstErrorField = form.formErrorsUtil.getFirstErrorField(formErrors)
    if (firstErrorField) {
      const element = document.getElementById(form.getFieldId(form, firstErrorField))
      if (element) {
        document.getElementById(form.getFieldId(form, firstErrorField)).focus()
      }
    }
  }

  const save = () => {
    if (valid) {
      submitForm()
    } else if (formErrors) {
      showErrors()
    }
  }

  const handleSubmit = event => {
    event.preventDefault()
    save()
  }

  const handleKeyPress = event => {
    if (event.key === 'Enter' && event.target.tagName !== 'TEXTAREA') {
      event.preventDefault() // disable save on enter key down
    }
  }

  const showErrors = event => {
    if (event) {
      event.preventDefault()
    }

    touchAllFields()
    focusErrorFields()
  }

  return <StyledForm
    onSubmit={handleSubmit}
    onKeyDown={handleKeyPress}
  >
    <form.FormBuilder
      entity={entity}
      model={entityModel}
      formName={props.form}
      formDefinition={formDefinition}
      formValues={formValues}
      fieldMappingType={formDefinition.readOnly ? 'readonly' : 'editable'}
      mode={mode}
      componentMapping={{[form.componentTypes.SUB_TABLE]: SubGrid}}
      customActions={customActions}
    />
    {!valid && anyTouched && <ErrorBox formErrors={formErrors} showErrors={showErrors}/>}
  </StyledForm>
}

DetailForm.propTypes = {
  intl: intlShape.isRequired,
  mode: PropTypes.oneOf(['update', 'create']),
  entityModel: PropTypes.object.isRequired,
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
  touchAllFields: PropTypes.func.isRequired,
  anyTouched: PropTypes.bool
}

export default reduxForm({
  form: 'detailForm',
  destroyOnUnmount: false
})(DetailForm)

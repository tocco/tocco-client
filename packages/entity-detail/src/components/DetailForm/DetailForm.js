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
  display: contents;
`

const DetailForm = props => {
  useEffect(() => {
    props.fireTouched(props.dirty)
  }, [props.dirty])

  const customActions = useMemo(() => (
    {
      save: () => <SaveButton intl={props.intl} submitting={props.submitting} mode={props.mode}/>
    }
  ), [props.submitting, props.mode])

  const focusErrorFields = () => {
    const firstErrorField = form.formErrorsUtil.getFirstErrorField(props.formErrors)
    if (firstErrorField) {
      const element = document.getElementById(form.getFieldId(props.form, firstErrorField))
      if (element) {
        document.getElementById(form.getFieldId(props.form, firstErrorField)).focus()
      }
    }
  }

  const save = () => {
    if (props.valid) {
      props.submitForm()
    } else if (props.formErrors) {
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

    props.touchAllFields()
    focusErrorFields()
  }

  return (
    <StyledForm
      onSubmit={handleSubmit}
      onKeyDown={handleKeyPress}
    >
      <form.FormBuilder
        entity={props.entity}
        model={props.entityModel}
        formName={props.form}
        formDefinition={props.formDefinition}
        formValues={props.formValues}
        fieldMappingType={props.formDefinition.readOnly ? 'readonly' : 'editable'}
        mode={props.mode}
        componentMapping={{[form.componentTypes.SUB_TABLE]: SubGrid}}
        customActions={customActions}
      />
      {!props.valid && props.anyTouched && <ErrorBox formErrors={props.formErrors} showErrors={showErrors}/>}
    </StyledForm>
  )
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

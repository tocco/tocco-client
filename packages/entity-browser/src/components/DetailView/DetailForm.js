import React from 'react'
import {reduxForm} from 'redux-form'

import {Button} from 'tocco-ui'
import ErrorBox from './ErrorBox'
import {getFieldId} from '../../util/detailView/helpers'
import {getForm} from '../../util/detailView/formBuilder'
import formErrorsUtil from '../../util/detailView/formErrors'

const isEntityLoaded = entity => (entity && entity.paths)

export const DetailForm = props => {
  const {entity, entityModel, selectBoxStores, form, loadRelationEntities, formErrors} = props

  if (!isEntityLoaded(entity)) {
    return <div/>
  }

  const touchFieldsWithError = () => {
    Object.keys(formErrorsUtil.getFieldErrors(formErrors)).forEach(f => props.touch(f))
  }

  const focusErrorFields = () => {
    const firstErrorField = formErrorsUtil.getFirstErrorField(formErrors)
    if (firstErrorField) {
      document.getElementById(getFieldId(form, firstErrorField)).focus()
    }
  }

  const save = () => {
    if (props.valid) {
      props.submitForm()
    } else if (formErrors) {
      touchFieldsWithError()
    }
  }

  const handleSubmit = event => {
    event.preventDefault()
    save()
  }

  const handleKeyPress = event => {
    if (event.ctrlKey && event.key === 's') {
      event.preventDefault()
      save()
    }

    if (event.key === 'Enter') {
      event.preventDefault()
    }
  }

  const showErrors = () => {
    touchFieldsWithError()
    focusErrorFields()
  }

  return (
    <form onSubmit={handleSubmit} className="form-horizontal" onKeyDown={handleKeyPress}>
      {getForm(props.formDefinition, {entity, entityModel, selectBoxStores, form, loadRelationEntities})}
      {!props.valid && props.anyTouched && <ErrorBox formErrors={formErrors} showErrors={showErrors}/>}
      <Button
        type="submit"
        label="Save"
        icon="glyphicon-floppy-save"
        pending={props.submitting}
        disabled={props.submitting || (props.anyTouched && !props.valid)}
        primary
      />
    </form>
  )
}

DetailForm.propTypes = {
  entityModel: React.PropTypes.object.isRequired,
  submitForm: React.PropTypes.func.isRequired,
  formDefinition: React.PropTypes.object.isRequired,
  entity: React.PropTypes.object.isRequired,
  loadRelationEntities: React.PropTypes.func.isRequired,
  selectBoxStores: React.PropTypes.shape({
    entityName: React.PropTypes.shape({
      loaded: React.PropTypes.bool,
      data: React.PropTypes.arrayOf(
        React.PropTypes.shape({
          value: React.PropTypes.string,
          label: React.PropTypes.string
        })
      )
    })
  }).isRequired,
  form: React.PropTypes.string.isRequired,
  submitting: React.PropTypes.bool,
  anyTouched: React.PropTypes.bool,
  formErrors: React.PropTypes.objectOf(
    React.PropTypes.objectOf(React.PropTypes.arrayOf(
      React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object])))
  ),
  valid: React.PropTypes.bool
}

export default reduxForm({
  form: 'detailForm',
  destroyOnUnmount: false
})(DetailForm)


import PropTypes from 'prop-types'
import React from 'react'
import {reduxForm} from 'redux-form'
import {intlShape} from 'react-intl'
import {form, formField} from 'tocco-app-extensions'

import SubGrid from '../../util/detailView/fromFieldFactories/subGrid'
import ErrorBox from '../ErrorBox'
import readOnlyFormFieldMapping from '../../util/detailView/readOnlyFormFieldMapping'
import SaveButton from './SaveButton'

export class DetailForm extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.dirty !== this.props.dirty) {
      this.props.fireTouched(this.props.dirty)
    }
  }

  focusErrorFields = () => {
    const firstErrorField = form.formErrorsUtil.getFirstErrorField(this.props.formErrors)
    if (firstErrorField) {
      const element = document.getElementById(form.getFieldId(this.props.form, firstErrorField))
      if (element) {
        document.getElementById(form.getFieldId(this.props.form, firstErrorField)).focus()
      }
    }
  }

  save = () => {
    if (this.props.valid) {
      this.props.submitForm()
    } else if (this.props.formErrors) {
      this.showErrors()
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    this.save()
  }

  handleKeyPress = event => {
    if (event.key === 'Enter' && event.target.tagName !== 'TEXTAREA') {
      event.preventDefault() // disable save on enter key down
    }
  }

  showErrors = event => {
    if (event) {
      event.preventDefault()
    }

    this.props.touchAllFields()
    this.focusErrorFields()
  }

  msg = id => (this.props.intl.formatMessage({id}))

  render() {
    const props = this.props

    const customActions = {
      save: () => <SaveButton intl={this.props.intl} submitting={this.props.submitting} mode={this.props.mode}/>
    }

    return (
      <form
        onSubmit={this.handleSubmit}
        onKeyDown={this.handleKeyPress}
      >
        <form.FormBuilder
          entity={props.entity}
          model={props.entityModel}
          formName={props.form}
          formDefinition={props.formDefinition}
          formValues={props.formValues}
          formFieldMapping={formField.defaultMapping}
          readOnlyFormFieldMapping={readOnlyFormFieldMapping}
          mode={props.mode}
          componentMapping={{[form.componentTypes.SUB_TABLE]: SubGrid}}
          customActions={customActions}
        />
        {!props.valid && props.anyTouched && <ErrorBox formErrors={props.formErrors} showErrors={this.showErrors}/>}
      </form>
    )
  }
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

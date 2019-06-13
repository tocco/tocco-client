import PropTypes from 'prop-types'
import React from 'react'
import {reduxForm} from 'redux-form'
import {intlShape, FormattedRelative, FormattedMessage} from 'react-intl'
import {Button} from 'tocco-ui'
import {form, formField} from 'tocco-app-extensions'

import SubGrid from '../../util/detailView/fromFieldFactories/subGrid'
import ErrorBox from '../ErrorBox'
import modes from '../../util/modes'
import readOnlyFormFieldMapping from '../../util/detailView/readOnlyFormFieldMapping'
import StyledDetailForm from './StyledDetailForm'

export class DetailForm extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.dirty !== this.props.dirty) {
      this.props.fireTouched(this.props.dirty)
    }
  }

  isReadOnlyForm = () => this.props.formDefinition.readonly

  isEntityLoaded = () => (this.props.entity && this.props.entity.paths)

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
      this.touchFieldsWithError()
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    this.save()
  }

  handleKeyPress = event => {
    if (event.ctrlKey && event.key === 's') {
      event.preventDefault()
      this.save()
    }

    if (event.key === 'Enter' && event.target.tagName !== 'TEXTAREA') {
      event.preventDefault()
    }
  }

  showErrors = event => {
    event.preventDefault()
    this.props.touchAllFields()
    this.focusErrorFields()
  }

  msg = id => (this.props.intl.formatMessage({id}))

  render() {
    const props = this.props

    if (!this.isEntityLoaded()) {
      return <div/>
    }

    return (
      <StyledDetailForm>
        <form
          className="form-horizontal detail-form"
          tabIndex="0"
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
          />
          {!this.isReadOnlyForm()
          && <div>
            {!props.valid && props.anyTouched && <ErrorBox formErrors={props.formErrors} showErrors={this.showErrors}/>}
            <Button
              disabled={props.submitting || (props.anyTouched && !props.valid)}
              ink="primary"
              label={this.msg(`client.entity-detail.${props.mode === modes.CREATE ? 'create' : 'save'}`)}
              look="raised"
              pending={props.submitting}
              type="submit"
              data-cy="detail-form_submit-button"
            />
            {props.lastSave
            && <div>
              <FormattedMessage id="client.entity-detail.lastSave"/>
              <span style={{marginLeft: '3px'}}> <FormattedRelative value={props.lastSave}/></span>
            </div>
            }
          </div>
          }
        </form>
      </StyledDetailForm>
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
  submitting: PropTypes.bool,
  formErrors: PropTypes.object,
  valid: PropTypes.bool,
  dirty: PropTypes.bool,
  lastSave: PropTypes.number,
  fireTouched: PropTypes.func.isRequired,
  touchAllFields: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'detailForm',
  destroyOnUnmount: false
})(DetailForm)

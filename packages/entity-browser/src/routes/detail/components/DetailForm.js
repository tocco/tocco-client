import React from 'react'
import {reduxForm, Field} from 'redux-form'
import _get from 'lodash/get'
import {intlShape, FormattedRelative, FormattedMessage} from 'react-intl'

import {Button, LayoutBox} from 'tocco-ui'
import LabeledField from './LabeledField'
import ErrorBox from './ErrorBox'
import {getFieldId, selectTypes} from '../../../util/detailView/helpers'
import {getForm} from '../../../util/detailView/formBuilder'
import formErrorsUtil from '../../../util/detailView/formErrors'

export class DetailForm extends React.Component {
  createLayoutComponent = (field, type, key, traverser) => {
    if (type === 'HorizontalBox' || type === 'VerticalBox') {
      const alignment = type === 'HorizontalBox' ? 'horizontal' : 'vertical'
      const label = field.useLabel ? field.label : undefined
      return (
        <LayoutBox key={key} label={label} alignment={alignment}>
          {traverser()}
        </LayoutBox>
      )
    }
  }

  createField = (field, key) => {
    const entityField = this.props.entity.paths[field.name]

    let fieldProps = {}

    if (selectTypes.includes(entityField.type)) {
      fieldProps.type = entityField.type === 'entity' ? 'single-select' : 'multi-select'
      const store = this.props.selectBoxStores[field.name] ? this.props.selectBoxStores[field.name].data : []
      fieldProps.options = {store}
    } else {
      fieldProps.type = entityField.value.type
    }

    const isMandatoryField = _get(this.props.entityModel, `${field.name}.validation.mandatory`, false)
    const isWritableField = _get(entityField, 'value.writable', true)

    const handleFocus = (type, fieldName) => {
      if (selectTypes.includes(type)) {
        this.props.loadRelationEntities(fieldName)
      }
    }

    return (
      <div key={key} onFocus={() => (handleFocus(entityField.type, field.name))}>
        <Field
          id={getFieldId(this.props.form, field.name)}
          name={field.name}
          key={key}
          label={field.label}
          component={LabeledField}
          mandatory={isMandatoryField}
          readOnly={!isWritableField}
          {...fieldProps}
        />
      </div>
    )
  }

  isEntityLoaded = () => (this.props.entity && this.props.entity.paths)

  touchFieldsWithError = () => {
    Object.keys(formErrorsUtil.getFieldErrors(this.props.formErrors)).forEach(f => this.props.touch(f))
  }

  focusErrorFields = () => {
    const firstErrorField = formErrorsUtil.getFirstErrorField(this.props.formErrors)
    if (firstErrorField) {
      document.getElementById(getFieldId(this.props.form, firstErrorField)).focus()
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

  showErrors = () => {
    this.touchFieldsWithError()
    this.focusErrorFields()
  }

  msg = id => (this.props.intl.formatMessage({id}))

  render() {
    const props = this.props

    if (!this.isEntityLoaded()) {
      return <div/>
    }

    return (
      <form tabIndex="0" onSubmit={this.handleSubmit} className="form-horizontal" onKeyDown={this.handleKeyPress}>
        {getForm(props.formDefinition, this.createField, this.createLayoutComponent)}
        {!props.valid && props.anyTouched && <ErrorBox formErrors={props.formErrors} showErrors={this.showErrors}/>}
        <Button
          type="submit"
          label={this.msg('client.entity-browser.save')}
          icon="glyphicon-floppy-save"
          pending={props.submitting}
          disabled={props.submitting || (props.anyTouched && !props.valid)}
          primary
        />
        {props.lastSave
        && <div>
          <FormattedMessage id="client.entity-browser.lastSave"/>: <FormattedRelative value={props.lastSave}/>
        </div>
        }
      </form>
    )
  }
}

DetailForm.propTypes = {
  intl: intlShape.isRequired,
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
  touch: React.PropTypes.func.isRequired,
  submitting: React.PropTypes.bool,
  anyTouched: React.PropTypes.bool,
  formErrors: React.PropTypes.objectOf(
    React.PropTypes.objectOf(React.PropTypes.arrayOf(
      React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object])))
  ),
  valid: React.PropTypes.bool,
  lastSave: React.PropTypes.number
}

export default reduxForm({
  form: 'detailForm',
  destroyOnUnmount: false
})(DetailForm)


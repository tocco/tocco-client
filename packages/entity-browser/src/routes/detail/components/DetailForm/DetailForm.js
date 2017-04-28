import React from 'react'
import {reduxForm, Field} from 'redux-form'
import {intlShape, FormattedRelative, FormattedMessage} from 'react-intl'
import {Link, Prompt} from 'react-router-dom'
import {Button, LayoutBox} from 'tocco-ui'

import ReduxFormFieldAdapter from '../ReduxFormFieldAdapter'
import ErrorBox from '../ErrorBox'
import {getFieldId} from '../../../../util/detailView/helpers'
import {getForm} from '../../../../util/detailView/formBuilder'
import formErrorsUtil from '../../../../util/detailView/formErrors'

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

  createField = (formDefinitionField, key) => {
    const fieldName = formDefinitionField.name
    const entityField = this.props.entity.paths[fieldName]
    const modelField = this.props.entityModel[fieldName]

    const formFieldUtils = {
      relationEntities: this.props.relationEntities,
      loadRelationEntity: this.props.loadRelationEntity,
      loadRemoteEntity: this.props.loadRemoteEntity,
      remoteEntities: this.props.remoteEntities,
      intl: this.props.intl
    }

    return (
      <Field
        key={key}
        name={fieldName}
        id={getFieldId(this.props.form, fieldName)}
        component={ReduxFormFieldAdapter}
        formDefinitionField={formDefinitionField}
        entityField={entityField}
        modelField={modelField}
        formFieldUtils={formFieldUtils}
      />
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
      <form
        className="form-horizontal detail-form"
        tabIndex="0"
        onSubmit={this.handleSubmit}
        onKeyDown={this.handleKeyPress}
      >
        <Prompt
          when={props.anyTouched}
          message={this.msg('client.entity-browser.confirmTouchedFormLeave')}
        />
        {getForm(props.formDefinition, this.createField, this.createLayoutComponent)}
        <LayoutBox alignment="horizontal">
          <LayoutBox alignment="vertical">
            {!props.valid && props.anyTouched && <ErrorBox formErrors={props.formErrors} showErrors={this.showErrors}/>}
            <Link className="btn btn-primary" to="/"><FormattedMessage id={`client.entity-browser.backToList`}/></Link>
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
              <FormattedMessage id="client.entity-browser.lastSave"/>
              <span style={{marginLeft:'3px'}}> <FormattedRelative value={props.lastSave}/></span>
            </div>
            }
          </LayoutBox>
        </LayoutBox>
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
  loadRelationEntity: React.PropTypes.func.isRequired,
  loadRemoteEntity: React.PropTypes.func.isRequired,
  relationEntities: React.PropTypes.shape({
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
  remoteEntities: React.PropTypes.shape({
    fieldName: React.PropTypes.shape({
      loading: React.PropTypes.bool,
      entities: React.PropTypes.arrayOf(
        React.PropTypes.shape({
          key: React.PropTypes.string,
          display: React.PropTypes.string
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

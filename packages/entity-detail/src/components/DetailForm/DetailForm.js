import React from 'react'
import {reduxForm} from 'redux-form'
import {intlShape, FormattedRelative, FormattedMessage} from 'react-intl'
import {Button, LayoutBox} from 'tocco-ui'
import {form} from 'tocco-util'

import ErrorBox from '../ErrorBox'
import formFieldMapping from '../../util/detailView/formFieldMapping'
import readOnlyFormFieldMapping from '../../util/detailView/readOnlyFormFieldMapping'

export class DetailForm extends React.Component {
  constructor(props) {
    super(props)

    this.formBuilder = this.createFormBuilder(props)
  }

  componentWillReceiveProps(props) {
    this.formBuilder = this.createFormBuilder(props)
    this.props.fireTouched(props.anyTouched)
  }

  createFormBuilder = props => {
    const formFieldUtils = {
      relationEntities: props.relationEntities,
      loadRelationEntity: props.loadRelationEntity,
      loadRemoteEntity: props.loadRemoteEntity,
      remoteEntities: props.remoteEntities,
      intl: this.props.intl
    }

    return form.initFormBuilder(
      props.entity,
      props.entityModel,
      props.form,
      props.formDefinition,
      props.formValues,
      formFieldUtils,
      formFieldMapping,
      readOnlyFormFieldMapping
    )
  }

  isReadOnlyForm = () => this.props.formDefinition.displayType === 'READONLY'

  isEntityLoaded = () => (this.props.entity && this.props.entity.paths)

  touchFieldsWithError = () => {
    Object.keys(form.formErrorsUtil.getFieldErrors(this.props.formErrors)).forEach(f => this.props.touch(f))
  }

  focusErrorFields = () => {
    const firstErrorField = form.formErrorsUtil.getFirstErrorField(this.props.formErrors)
    if (firstErrorField) {
      document.getElementById(form.getFieldId(this.props.form, firstErrorField)).focus()
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
        {this.formBuilder()}
        {!this.isReadOnlyForm()
        && <LayoutBox alignment="horizontal">
          <LayoutBox alignment="vertical">
            {!props.valid && props.anyTouched && <ErrorBox formErrors={props.formErrors} showErrors={this.showErrors}/>}
            <Button
              type="submit"
              label={this.msg('client.entity-detail.save')}
              pending={props.submitting}
              disabled={props.submitting || (props.anyTouched && !props.valid)}
              primary
            />
            {props.lastSave
            && <div>
              <FormattedMessage id="client.entity-detail.lastSave"/>
              <span style={{marginLeft: '3px'}}> <FormattedRelative value={props.lastSave}/></span>
            </div>
            }
          </LayoutBox>
        </LayoutBox>
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
  loadRelationEntity: React.PropTypes.func.isRequired,
  formValues: React.PropTypes.object,
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
  lastSave: React.PropTypes.number,
  fireTouched: React.PropTypes.func.isRequired
}

export default reduxForm({
  form: 'detailForm',
  destroyOnUnmount: false
})(DetailForm)

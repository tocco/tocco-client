import PropTypes from 'prop-types'
import React from 'react'
import {reduxForm} from 'redux-form'
import {intlShape, FormattedRelative, FormattedMessage} from 'react-intl'
import {Button, LayoutBox} from 'tocco-ui'
import {form} from 'tocco-util'

import ErrorBox from '../ErrorBox'
import formFieldMapping from '../../util/detailView/formFieldMapping'
import modes from '../../util/modes'
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
      uploadDocument: props.uploadDocument,
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
      readOnlyFormFieldMapping,
      undefined,
      props.mode
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
              label={this.msg(`client.entity-detail.${props.mode === modes.CREATE ? 'create' : 'save'}`)}
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
  mode: PropTypes.oneOf(['update', 'create']),
  entityModel: PropTypes.object.isRequired,
  submitForm: PropTypes.func.isRequired,
  formDefinition: PropTypes.object.isRequired,
  entity: PropTypes.object.isRequired,
  loadRelationEntity: PropTypes.func.isRequired,
  formValues: PropTypes.object,
  loadRemoteEntity: PropTypes.func.isRequired,
  uploadDocument: PropTypes.func.isRequired,
  relationEntities: PropTypes.shape({
    entityName: PropTypes.shape({
      loaded: PropTypes.bool,
      data: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string,
          label: PropTypes.string
        })
      )
    })
  }).isRequired,
  remoteEntities: PropTypes.shape({
    fieldName: PropTypes.shape({
      loading: PropTypes.bool,
      entities: PropTypes.arrayOf(
        PropTypes.shape({
          key: PropTypes.string,
          display: PropTypes.string
        })
      )
    })
  }).isRequired,
  form: PropTypes.string.isRequired,
  touch: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  anyTouched: PropTypes.bool,
  formErrors: PropTypes.objectOf(
    PropTypes.objectOf(PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.object])))
  ),
  valid: PropTypes.bool,
  lastSave: PropTypes.number,
  fireTouched: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'detailForm',
  destroyOnUnmount: false
})(DetailForm)

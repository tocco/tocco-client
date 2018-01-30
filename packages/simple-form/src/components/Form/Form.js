import React from 'react'
import PropTypes from 'prop-types'

import {form, formField} from 'tocco-util'
import {Button} from 'tocco-ui'
import {reduxForm} from 'redux-form'
import {intlShape} from 'react-intl'

class Form extends React.Component {
  constructor(props) {
    super(props)
    this.formBuilder = this.createFormBuilder(props)
  }

  componentWillMount() {
    this.props.initializeForm()
  }

  componentWillReceiveProps(props) {
    this.formBuilder = this.createFormBuilder(props)
  }

  msg = id => this.props.intl.formatMessage({id})

  createFormBuilder = props => {
    const formFieldUtils = {
      relationEntities: props.relationEntities,
      loadRelationEntity: props.loadRelationEntity,
      loadRemoteEntity: props.loadRemoteEntity,
      remoteEntities: props.remoteEntities,
      loadSearchFilters: props.loadSearchFilters,
      searchFilters: props.searchFilters,
      uploadDocument: props.uploadDocument,
      intl: this.props.intl
    }

    return form.initFormBuilder(
      undefined,
      props.model,
      'simpleForm',
      props.formDefinition,
      props.formValues,
      formFieldUtils,
      formField.defaultMapping,
      {}, // never read only
      this.shouldRenderField,
      'simple'
    )
  }

  handleCancel = () => {
    this.props.onCancel()
  }

  sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

  handleSubmit = values =>
    this.sleep(400).then(() => {
      // delay closing of the window so it won't close immediately with the click
      this.props.onSubmit()
    })

  render = () => (
    <form onSubmit={this.props.handleSubmit(this.handleSubmit)} className="form form-horizontal">
      {this.formBuilder()}
      <Button
        type="submit"
        label={this.props.submitText || this.msg('client.simple-form.defaultOk')}
        primary
        pending={this.props.submitting}
        disabled={this.props.submitting}
      />
      <Button
        label={this.props.cancelText || this.msg('client.simple-form.defaultCancel')}
        onClick={this.handleCancel}
        disabled={this.props.submitting}
      />
    </form>
  )
}

Form.propTypes = {
  intl: intlShape.isRequired,
  initializeForm: PropTypes.func.isRequired,
  uploadDocument: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  formDefinition: PropTypes.object.isRequired,
  model: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
  cancelText: PropTypes.string,
  submitText: PropTypes.string
}

export default reduxForm({form: 'simpleForm'})(Form)

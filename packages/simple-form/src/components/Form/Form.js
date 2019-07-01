import React from 'react'
import PropTypes from 'prop-types'
import {form, formField} from 'tocco-app-extensions'
import {Button} from 'tocco-ui'
import {reduxForm} from 'redux-form'
import {intlShape} from 'react-intl'

const REDUX_FORM_NAME = 'simpleForm'

class Form extends React.Component {
  constructor(props) {
    super(props)
    this.props.initializeForm()
  }

  msg = id => this.props.intl.formatMessage({id})

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
    <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
      <form.FormBuilder
        entity={undefined}
        model={this.props.model}
        formName={this.props.form}
        formDefinition={this.props.formDefinition}
        formValues={this.props.formValues}
        formFieldMapping={formField.defaultMapping}
        readOnlyFormFieldMapping={null}
      />
      {!this.props.noButtons
      && <React.Fragment>
        <Button
          disabled={this.props.submitting}
          ink="primary"
          label={this.props.submitText || this.msg('client.simple-form.defaultOk')}
          pending={this.props.submitting}
          type="submit"
        />
        <Button
          disabled={this.props.submitting}
          label={this.props.cancelText || this.msg('client.simple-form.defaultCancel')}
          onClick={this.handleCancel}
        />
      </React.Fragment>
      }
    </form>
  )
}

Form.propTypes = {
  intl: intlShape.isRequired,
  initializeForm: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  formDefinition: PropTypes.object.isRequired,
  model: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
  cancelText: PropTypes.string,
  submitText: PropTypes.string,
  noButtons: PropTypes.bool,
  formValues: PropTypes.object,
  form: PropTypes.string
}

export default reduxForm({form: REDUX_FORM_NAME, destroyOnUnmount: false})(Form)

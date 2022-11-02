import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'
import {getFormValues} from 'redux-form'
import {form} from 'tocco-app-extensions'

import Form from '../components/Form'
import {initializeForm, submit, cancel} from '../modules/simpleForm/actions'

const mapActionCreators = {
  initializeForm,
  onSubmit: submit,
  onCancel: cancel
}

const mapStateToProps = (state, props) => ({
  noButtons: state.input.noButtons,
  title: state.input.title,
  description: state.input.description,
  submitText: state.input.submitText,
  cancelText: state.input.cancelText,
  formDefinition: state.input.form,
  beforeRenderField: state.input.beforeRenderField,
  formValues: getFormValues('simpleForm')(state),
  validate:
    state.input.validate !== false
      ? form.syncValidation(state.simpleForm.fieldDefinitions, state.input.form)
      : () => {},
  listApp: state.input.listApp,
  mappingType: state.input.mappingType,
  mode: state.input.mode
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(Form))

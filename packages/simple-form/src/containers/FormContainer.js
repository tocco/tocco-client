import {connect} from 'react-redux'
import {form} from 'tocco-app-extensions'
import {injectIntl} from 'react-intl'
import {hot} from 'react-hot-loader/root'

import Form from '../../src/components/Form'
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
  validate: state.input.validate !== false ? form.syncValidation(state.simpleForm.fieldDefinitions) : () => {},
  listApp: state.input.listApp,
  mappingType: state.input.mappingType
})

export default hot(connect(mapStateToProps, mapActionCreators)(injectIntl(Form)))

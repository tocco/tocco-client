import {connect} from 'react-redux'
import {form, formData} from 'tocco-app-extensions'
import {injectIntl} from 'react-intl'

import Form from '../../src/components/Form'
import {initializeForm, submit, cancel} from '../modules/simpleForm/actions'

const mapActionCreators = {
  initializeForm,
  onSubmit: submit,
  onCancel: cancel,
  loadRelationEntities: formData.loadRelationEntities,
  loadTooltip: formData.loadTooltip,
  uploadDocument: formData.uploadDocument,
  openAdvancedSearch: formData.openAdvancedSearch,
  changeFieldValue: formData.changeFieldValue
}

const mapStateToProps = (state, props) => ({
  noButtons: state.input.noButtons,
  title: state.input.title,
  description: state.input.description,
  submitText: state.input.submitText,
  cancelText: state.input.cancelText,
  model: state.input.model,
  formDefinition: state.input.form,
  validate: form.syncValidation(state.input.model),
  relationEntities: formData.relationEntitiesSelector(state),
  tooltips: formData.tooltipSelector(state),
  listApp: state.input.listApp
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(Form))

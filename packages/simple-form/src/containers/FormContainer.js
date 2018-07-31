import {connect} from 'react-redux'
import Form from '../../src/components/Form'
import {form, formData} from 'tocco-util'
import {initializeForm, submit, cancel, advancedSearchUpdate} from '../modules/simpleForm/actions'
import {uploadDocument} from '../utils/form/document/actions'
import {injectIntl} from 'react-intl'
import EntityListApp from 'tocco-entity-list/src/main'

const mapActionCreators = {
  initializeForm,
  onSubmit: submit,
  onCancel: cancel,
  loadRelationEntities: formData.loadRelationEntities,
  openAdvancedSearch: (...args) => formData.openAdvancedSearch(EntityListApp, advancedSearchUpdate, ...args),
  uploadDocument
}

const mapStateToProps = (state, props) => ({
  title: state.input.title,
  description: state.input.description,
  submitText: state.input.submitText,
  cancelText: state.input.cancelText,
  model: state.input.model,
  formDefinition: state.input.form,
  validate: form.syncValidation(state.input.model),
  relationEntities: formData.relationEntitiesSelector(state)
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(Form))

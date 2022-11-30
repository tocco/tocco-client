import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'
import {isValid} from 'redux-form'
import {templateValues} from 'tocco-app-extensions'

import {loadFormData, runExport, handleTemplateChange} from '../modules/export/actions'
import Export from './Export'

const mapActionCreators = {
  loadFormData,
  runExport,
  handleTemplateChange
}

const mapStateToProps = state => ({
  availableColumns: state.exportAction.availableColumns,
  defaultValues: state.exportAction.defaultValues,
  selection: state.input.selection,
  templatesInitialized: state.templateValues.initialized,
  formValid: isValid(templateValues.reduxFormName)(state)
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(Export))

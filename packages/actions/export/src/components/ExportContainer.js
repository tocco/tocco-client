import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'

import {loadFormData, setAvailableColumns, runExport} from '../modules/export/actions'
import Export from './Export'

const mapActionCreators = {
  loadFormData,
  setAvailableColumns,
  runExport
}

const mapStateToProps = state => ({
  availableColumns: state.exportAction.availableColumns,
  defaultValues: state.exportAction.defaultValues,
  selection: state.input.selection
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(Export))

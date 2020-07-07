import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import InputEdit from './InputEdit'
import {initializeTable} from '../../modules/inputEditTable/actions'
import {initializeSearch} from '../../modules/inputEditSearch/actions'
import {initializeInformation} from '../../modules/inputEditInformation/actions'

const mapActionCreators = {
  initializeTable,
  initializeSearch,
  initializeInformation
}

const mapStateToProps = state => ({
  entityKey: state.inputEdit.entityKey,
  inputDataForm: state.inputEditTable.inputDataForm
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(InputEdit))

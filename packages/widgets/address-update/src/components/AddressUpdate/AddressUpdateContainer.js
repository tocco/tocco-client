import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'
import {getFormInitialValues} from 'redux-form'

import {unloadView} from '../../modules/addressUpdate/actions'
import AddressUpdate from './AddressUpdate'

const mapActionCreators = {
  unloadView
}

const mapStateToProps = state => ({
  mode: state.addressUpdate.mode,
  formDefinition: state.addressUpdate.formDefinition,
  formInitialValues: getFormInitialValues('addressForm')(state),
  fieldDefinitions: state.addressUpdate.fieldDefinitions
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(AddressUpdate))

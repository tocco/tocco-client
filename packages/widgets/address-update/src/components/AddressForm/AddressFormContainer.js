import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'
import {getFormValues} from 'redux-form'
import {form} from 'tocco-app-extensions'

import {submitForm, fireTouched} from '../../modules/addressUpdate/actions'
import AddressForm from './AddressForm'

const mapActionCreators = {
  submitForm,
  fireTouched
}

const mapStateToProps = state => ({
  mode: state.addressUpdate.mode,
  formDefinition: state.addressUpdate.formDefinition,
  entity: state.addressUpdate.entity,
  formValues: getFormValues('addressForm')(state),
  formErrors: form.selectors.getFormErrors('addressForm')(state)
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(AddressForm))

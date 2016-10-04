import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import PasswordUpdateDialog from '../components/PasswordUpdateDialog'
import {initialized} from '../modules/actions'
import {updateOldPassword, updateNewPassword, updateNewPasswordRepeat, savePassword} from '../modules/password'
import {fetchValidationRules} from '../modules/validationRules'

const mapActionCreators = {
  updateOldPassword,
  updateNewPassword,
  updateNewPasswordRepeat,
  fetchValidationRules,
  savePassword,
  initialized
}

const mapStateToProps = state => {
  return {
    password: state.password,
    validationRules: state.validationRules,
    showOldPasswordField: state.input.showOldPasswordField
  }
}

export default connect(mapStateToProps, mapActionCreators)(injectIntl(PasswordUpdateDialog))

import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import PasswordUpdateDialog from '../components/passwordUpdate/PasswordUpdateDialog'
import {initialized} from '../modules/passwordUpdate/actions'
import {
  updateOldPassword, updateNewPassword, updateNewPasswordRepeat, savePassword
} from '../modules/passwordUpdate/password'
import {fetchValidationRules} from '../modules/passwordUpdate/validationRules'

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
    password: state.passwordUpdate.password,
    validationRules: state.passwordUpdate.validationRules,
    showOldPasswordField: state.passwordUpdate.dialog.showOldPasswordField,
    forcedUpdate: state.passwordUpdate.dialog.forcedUpdate
  }
}

export default connect(mapStateToProps, mapActionCreators)(injectIntl(PasswordUpdateDialog))

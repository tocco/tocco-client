import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import {hot} from 'react-hot-loader/root'

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

const mapStateToProps = state => ({
  password: state.passwordUpdate.password,
  validationRules: state.passwordUpdate.validationRules,
  showOldPasswordField: state.passwordUpdate.dialog.showOldPasswordField,
  forcedUpdate: state.passwordUpdate.dialog.forcedUpdate
})

export default hot(connect(mapStateToProps, mapActionCreators)(injectIntl(PasswordUpdateDialog)))

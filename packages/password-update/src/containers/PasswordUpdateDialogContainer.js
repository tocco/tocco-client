import { connect } from 'react-redux'
import PasswordUpdateDialog from '../components/PasswordUpdateDialog'
import {updateOldPassword, updateNewPassword, updateNewPasswordRepeat, savePassword} from '../modules/password'
import {fetchValidationRules} from '../modules/validationRules'

const mapActionCreators = {
  updateOldPassword,
  updateNewPassword,
  updateNewPasswordRepeat,
  fetchValidationRules,
  savePassword
}

const mapStateToProps = (state) => {
  return {
    password: state.password,
    validationRules: state.validationRules,
    showOldPasswordField: state.input.showOldPasswordField
  }
}

export default connect(mapStateToProps, mapActionCreators)(PasswordUpdateDialog)

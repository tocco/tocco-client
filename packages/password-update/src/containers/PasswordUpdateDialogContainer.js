import { connect } from 'react-redux'
import PasswordUpdateDialog from '../components/PasswordUpdateDialog'
import {updateOldPassword, updateNewPassword, updateNewPasswordRepeat} from '../modules/password'
import {fetchValidationRules} from '../modules/validationRules'

const mapActionCreators = {
  updateOldPassword,
  updateNewPassword,
  updateNewPasswordRepeat,
  fetchValidationRules
}

const mapStateToProps = (state) => {
  return {
    password: state.password,
    validationRules: state.validationRules
  }
}

export default connect(mapStateToProps, mapActionCreators)(PasswordUpdateDialog)

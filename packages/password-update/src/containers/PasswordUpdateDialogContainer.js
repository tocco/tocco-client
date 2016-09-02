import { connect } from 'react-redux'
import PasswordUpdateDialog from '../components/PasswordUpdateDialog'
import {updateOldPassword, updateNewPassword, updateNewPasswordRepeat} from '../modules/password'

const mapActionCreators = {
  updateOldPassword,
  updateNewPassword,
  updateNewPasswordRepeat
}

const mapStateToProps = (state) => {
  return {
    password: state.password
  }
}

export default connect(mapStateToProps, mapActionCreators)(PasswordUpdateDialog)

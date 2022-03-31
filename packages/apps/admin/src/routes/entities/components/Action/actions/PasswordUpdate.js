import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {notification} from 'tocco-app-extensions'
import {PasswordUpdateApp} from 'tocco-login/src/main'

const mapActionCreators = {
  closeModal: notification.removeModal
}

const PasswordUpdate = ({selection, closeModal}) => (
  <PasswordUpdateApp
    username={selection.ids[0]}
    showOldPasswordField={false}
    success={() => closeModal('action-password-update')}
  />
)

PasswordUpdate.propTypes = {
  selection: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired
}

export default connect(null, mapActionCreators)(PasswordUpdate)

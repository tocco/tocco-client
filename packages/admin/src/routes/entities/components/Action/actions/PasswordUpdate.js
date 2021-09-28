import {PasswordUpdateApp} from 'tocco-login/src/main'
import {connect} from 'react-redux'
import React from 'react'
import PropTypes from 'prop-types'
import {notification} from 'tocco-app-extensions'

const mapActionCreators = {
  closeModal: notification.removeModal
}

const PasswordUpdate = ({selection, closeModal}) =>
  <PasswordUpdateApp
    username={selection.ids[0]}
    showOldPasswordField={false}
    success={() => closeModal('action-password-update')}/>

PasswordUpdate.propTypes = {
  selection: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired
}

export default connect(null, mapActionCreators)(PasswordUpdate)

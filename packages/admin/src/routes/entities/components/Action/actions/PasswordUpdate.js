import {PasswordUpdateApp} from 'tocco-login/src/main'
import {connect} from 'react-redux'
import React from 'react'
import PropTypes from 'prop-types'
import {notification} from 'tocco-app-extensions'

const mapStateToProps = state => ({
  username: state.session.username
})

const mapActionCreators = {
  closeModal: notification.removeModal
}

const PasswordUpdate = ({username, closeModal}) => {
  return <PasswordUpdateApp
    username={username}
    showOldPasswordField={false}
    success={() => closeModal('action-password-update')}/>
}

PasswordUpdate.propTypes = {
  username: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapActionCreators)(PasswordUpdate)

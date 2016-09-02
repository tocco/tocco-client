import React from 'react'

const PasswordUpdateDialog = (props) => (
  <div className="PasswordUpdateDialog">
    <div className="form-group oldPassword">
      <label htmlFor="oldPasswordInput">Altes Passwort</label>
      <input
        type="password"
        className="form-control"
        id="oldPasswordInput"
        value={props.password.oldPassword}
        onChange={e => props.updateOldPassword(e.target.value)}
      />
    </div>
    <div className="form-group newPassword">
      <label htmlFor="newPasswordInput">Neues Passwort</label>
      <input
        type="password"
        className="form-control"
        id="newPasswordInput"
        value={props.password.newPassowrd}
        onChange={e => props.updateNewPassword(e.target.value)}
      />
    </div>
    <div className="form-group newPasswordRepeat">
      <label htmlFor="newPasswordRepeatInput">Neues Passwort bestätigen</label>
      <input
        type="password"
        className="form-control"
        id="newPasswordRepeatInput"
        value={props.password.newPasswordRepeat}
        onChange={e => props.updateNewPasswordRepeat(e.target.value)}
      />
    </div>
  </div>
)

PasswordUpdateDialog.propTypes = {
  password: React.PropTypes.shape({
    oldPassword: React.PropTypes.string.isRequired,
    newPassword: React.PropTypes.string.isRequired,
    newPasswordRepeat: React.PropTypes.string.isRequired,
    newPasswordValid: React.PropTypes.bool.isRequired
  }).isRequired,
  updateOldPassword: React.PropTypes.func.isRequired,
  updateNewPassword: React.PropTypes.func.isRequired,
  updateNewPasswordRepeat: React.PropTypes.func.isRequired
}

export default PasswordUpdateDialog

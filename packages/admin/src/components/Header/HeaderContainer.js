import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import {notification} from 'tocco-app-extensions'

import {doLogout, loadBusinessUnits, changeBusinessUnit} from '../../modules/session/actions'
import Header from './Header'

const mapActionCreators = {
  doLogout,
  loadBusinessUnits,
  changeBusinessUnit,
  openModalComponent: notification.modal,
  removeModalComponent: notification.removeModal,
  info: notification.toaster
}

const mapStateToProps = (state, props) => ({
  username: state.session.username,
  currentBusinessUnit: state.session.currentBusinessUnit,
  businessUnits: state.session.businessUnits,
  runEnv: state.preferences.serverSettings.runEnv,
  niceVersion: state.preferences.serverSettings.niceVersion
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(Header))

import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'
import {notification, appFactory} from 'tocco-app-extensions'

import {setMenuOpen} from '../../modules/navigation/actions'
import {doLogout, loadBusinessUnits, changeBusinessUnit} from '../../modules/session/actions'
import Header from './Header'

const mapActionCreators = {
  doLogout,
  loadBusinessUnits,
  changeBusinessUnit,
  openModalComponent: notification.modal,
  removeModalComponent: notification.removeModal,
  info: notification.toaster,
  setMenuOpen,
  setThemeType: appFactory.setThemeType
}

const mapStateToProps = (state, props) => ({
  username: state.session.username,
  currentBusinessUnit: state.session.currentBusinessUnit,
  businessUnits: state.session.businessUnits,
  runEnv: state.preferences.serverSettings.runEnv,
  niceVersion: state.preferences.serverSettings.niceVersion,
  themeType: state.theme.themeType
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(Header))

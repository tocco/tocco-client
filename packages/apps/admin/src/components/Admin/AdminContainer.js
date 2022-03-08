import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'
import {notification} from 'tocco-app-extensions'

import {initializeNavigation, setMenuOpen} from '../../modules/navigation/actions'
import {loadSettingsAndPreferences} from '../../modules/preferences/actions'
import {loadPrincipal} from '../../modules/session/actions'
import Admin from './Admin'

const mapActionCreators = {
  loadPrincipal,
  confirm: notification.confirm,
  initializeNavigation,
  setMenuOpen,
  loadSettingsAndPreferences
}

const mapStateToProps = (state, props) => ({
  baseRoute: state.input.baseRoute,
  menuOpen: state.navigation.menuOpen,
  adminAllowed: state.login.adminAllowed
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(Admin))

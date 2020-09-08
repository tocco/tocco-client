import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import {notifier, viewPersistor} from 'tocco-app-extensions'

import {loadPrincipal, loadServerSettings} from '../../modules/session/actions'
import {initializeNavigation, setMenuOpen} from '../../modules/navigation/actions'
import Admin from './Admin'

const mapActionCreators = {
  loadPrincipal,
  confirm: notifier.confirm,
  initializeNavigation,
  setMenuOpen,
  clearPersistedViews: viewPersistor.clearPersistedViews,
  loadServerSettings
}

const mapStateToProps = (state, props) => ({
  baseRoute: state.input.baseRoute,
  menuOpen: state.navigation.menuOpen
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(Admin))

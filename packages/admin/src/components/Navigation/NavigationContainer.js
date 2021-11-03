import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import Navigation from './Navigation'
import {saveUserPreferences} from '../../modules/preferences/actions'
import {setActiveMenuTab, setVisibleMenus} from '../../modules/navigation/actions'
const mapActionCreators = {
  setActiveMenuTab,
  setVisibleMenus,
  saveUserPreferences
}

const mapStateToProps = (state, props) => ({
  settingsMenuTree: state.navigation.settingsMenuTree,
  modulesMenuTree: state.navigation.modulesMenuTree,
  systemMenuTree: state.navigation.systemMenuTree,
  completeMenuTree: state.navigation.completeMenuTree,
  menuOpen: state.navigation.menuOpen,
  activeMenuTab: state.navigation.activeMenuTab,
  visibleMenus: state.navigation.visibleMenus
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(Navigation))

import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'

import {setActiveMenuTab} from '../../modules/navigation/actions'
import {saveUserPreferences} from '../../modules/preferences/actions'
import Navigation from './Navigation'
const mapActionCreators = {
  setActiveMenuTab,
  saveUserPreferences
}

const mapStateToProps = (state, props) => ({
  settingsMenuTree: state.navigation.settingsMenuTree,
  modulesMenuTree: state.navigation.modulesMenuTree,
  systemMenuTree: state.navigation.systemMenuTree,
  completeMenuTree: state.navigation.completeMenuTree,
  menuOpen: state.navigation.menuOpen,
  activeMenuTab: state.navigation.activeMenuTab
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(Navigation))

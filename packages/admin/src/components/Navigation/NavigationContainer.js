import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import Navigation from './Navigation'
import {setActiveMenuTab} from '../../modules/navigation/actions'
const mapActionCreators = {
  setActiveMenuTab
}

const mapStateToProps = (state, props) => ({
  settingsMenuTree: state.navigation.settingsMenuTree,
  modulesMenuTree: state.navigation.modulesMenuTree,
  menuOpen: state.navigation.menuOpen,
  activeMenuTab: state.navigation.activeMenuTab
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(Navigation))

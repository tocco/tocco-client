import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import Navigation from './Navigation'

const mapActionCreators = {}

const mapStateToProps = (state, props) => ({
  menuItems: state.navigation.menuItems,
  menuOpen: state.navigation.menuOpen

})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(Navigation))

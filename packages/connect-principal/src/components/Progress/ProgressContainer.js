import {connect} from 'react-redux'

import Progress from './Progress'
import {checkAccessRights, connectPrincipal, setShowSsoLoginApp} from '../../modules/connectPrincipal/actions'

const mapActionCreators = {
  checkAccessRights,
  connectPrincipal,
  setShowSsoLoginApp
}

const mapStateToProps = state => ({
  showSsoLoginApp: state.connectPrincipal.showSsoLoginApp
})

export default connect(mapStateToProps, mapActionCreators)(Progress)

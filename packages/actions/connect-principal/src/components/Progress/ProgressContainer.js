import {connect} from 'react-redux'

import {checkAccessRights, connectPrincipal, setShowSsoLoginApp} from '../../modules/connectPrincipal/actions'
import Progress from './Progress'

const mapActionCreators = {
  checkAccessRights,
  connectPrincipal,
  setShowSsoLoginApp
}

const mapStateToProps = state => ({
  showSsoLoginApp: state.connectPrincipal.showSsoLoginApp
})

export default connect(mapStateToProps, mapActionCreators)(Progress)

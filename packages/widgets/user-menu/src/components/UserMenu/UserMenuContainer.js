import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'

import {logout} from '../../modules/userMenu/actions'
import UserMenu from './UserMenu'

const mapActionCreators = {
  logout
}

const mapStateToProps = state => ({
  loggedIn: state.userMenu.loggedIn,
  username: state.userMenu.username
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(UserMenu))

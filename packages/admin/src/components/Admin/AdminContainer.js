import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import {notifier} from 'tocco-app-extensions'

import {doLogout, doSessionCheck} from '../../modules/session/actions'
import {initializeNavigation} from '../../modules/navigation/actions'
import Admin from './Admin'

const mapActionCreators = {
  doLogout,
  doSessionCheck,
  confirm: notifier.confirm,
  initializeNavigation
}

const mapStateToProps = (state, props) => ({
  loggedIn: state.session.loggedIn,
  baseRoute: state.input.baseRoute
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(Admin))

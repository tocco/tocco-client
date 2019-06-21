import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import {doLogout, doSessionCheck} from '../modules/session/actions'
import {locationChanged} from '../modules/path/actions'
import Admin from '../components/Admin'

const mapActionCreators = {
  doLogout,
  doSessionCheck,
  locationChanged
}

const mapStateToProps = (state, props) => ({
  loggedIn: state.session.loggedIn,
  baseRoute: state.input.baseRoute
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(Admin))

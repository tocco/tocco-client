import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import Login from '../components/Login'
import {loginSuccessful} from '../modules/session/actions'

const mapActionCreators = {
  loginSuccessful
}

const mapStateToProps = (state, props) => ({

})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(Login))

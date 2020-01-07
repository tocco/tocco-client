import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import {doLogout, loadBusinessUnits, changeBusinessUnit} from '../../modules/session/actions'
import Header from './Header'

const mapActionCreators = {
  doLogout,
  loadBusinessUnits,
  changeBusinessUnit
}

const mapStateToProps = (state, props) => ({
  username: state.session.username,
  currentBusinessUnit: state.session.currentBusinessUnit,
  businessUnits: state.session.businessUnits
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(Header))

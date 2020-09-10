import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import {notifier} from 'tocco-app-extensions'

import {doLogout, loadBusinessUnits, changeBusinessUnit} from '../../modules/session/actions'
import Header from './Header'

const mapActionCreators = {
  doLogout,
  loadBusinessUnits,
  changeBusinessUnit,
  openModalComponent: notifier.modalComponent
}

const mapStateToProps = (state, props) => ({
  username: state.session.username,
  currentBusinessUnit: state.session.currentBusinessUnit,
  businessUnits: state.session.businessUnits,
  runEnv: state.session.serverSettings.runEnv,
  niceVersion: state.session.serverSettings.niceVersion
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(Header))

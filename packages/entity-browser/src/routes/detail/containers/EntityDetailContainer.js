import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import {actionEmitter} from 'tocco-app-extensions'

import EntityDetail from '../components/EntityDetail'
import {loadDetailParams, clearDetailParams, setFormTouched} from '../modules/actions'

const mapActionCreators = {
  loadDetailParams,
  clearDetailParams,
  setFormTouched,
  dispatchEmittedAction: actionEmitter.dispatchEmittedAction
}

const mapStateToProps = (state, props) => {
  return {
    appId: state.entityBrowser.appId,
    detailParams: state.detail.detailParams,
    formTouched: state.detail.formTouched,
    locale: state.input.locale
  }
}

export default connect(mapStateToProps, mapActionCreators)(injectIntl(EntityDetail))

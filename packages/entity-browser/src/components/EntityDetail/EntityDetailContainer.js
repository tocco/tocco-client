import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'
import {actionEmitter} from 'tocco-app-extensions'

import {loadDetailParams, clearDetailParams, setFormTouched} from '../../modules/detail/actions'
import Action from '../LazyAction'
import EntityDetail from './EntityDetail'

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
    locale: state.intl.locale,
    actionAppComponent: Action
  }
}

export default connect(mapStateToProps, mapActionCreators)(injectIntl(EntityDetail))

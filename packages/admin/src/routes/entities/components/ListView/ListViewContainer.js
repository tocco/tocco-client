import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import {actionEmitter} from 'tocco-app-extensions'
import _get from 'lodash/get'

import {saveUserPreferences} from '../../../../modules/preferences/actions'
import ListView from './ListView'
const mapActionCreators = {
  emitAction: action => actionEmitter.dispatchEmittedAction(action),
  saveUserPreferences
}

const mapStateToProps = (state, props) => ({
  currentViewInfo: state.entities.path.currentViewInfos[props.history.location.pathname],
  searchFormCollapsed: _get(state.preferences.userPreferences, 'admin.list.searchFormCollapsed', false)
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(ListView))

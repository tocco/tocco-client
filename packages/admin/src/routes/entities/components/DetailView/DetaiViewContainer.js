import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import _get from 'lodash/get'

import DetailView from './DetailView'
import {saveUserPreferences} from '../../../../modules/preferences/actions'
const mapActionCreators = {
  saveUserPreferences
}

const mapStateToProps = (state, props) => ({
  currentViewInfo: state.entities.path.currentViewInfos[props.history.location.pathname],
  relationViewCollapsed: _get(state.preferences.userPreferences, 'admin.detail.relationViewCollapsed', false)
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(DetailView))

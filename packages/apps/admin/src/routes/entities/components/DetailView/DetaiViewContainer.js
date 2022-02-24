import _get from 'lodash/get'
import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'

import {saveUserPreferences} from '../../../../modules/preferences/actions'
import DetailView from './DetailView'
const mapActionCreators = {
  saveUserPreferences
}

const mapStateToProps = (state, props) => ({
  currentViewInfo: state.entities.path.currentViewInfos[props.location.pathname],
  relationViewCollapsed: _get(state.preferences.userPreferences, 'admin.detail.relationViewCollapsed', false)
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(DetailView))

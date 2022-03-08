import _get from 'lodash/get'
import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'

import {saveUserPreferences} from '../../../../modules/preferences/actions'
import DocsBrowserApp from './DocsBrowserApp'

const mapActionCreators = {
  saveUserPreferences
}

const mapStateToProps = (state, props) => ({
  searchFormCollapsed: _get(state.preferences.userPreferences, 'admin.list.searchFormCollapsed', null)
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(DocsBrowserApp))

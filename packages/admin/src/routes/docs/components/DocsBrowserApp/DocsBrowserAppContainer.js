import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import _get from 'lodash/get'

import DocsBrowserApp from './DocsBrowserApp'
import {saveUserPreferences} from '../../../../modules/preferences/actions'

const mapActionCreators = {
  saveUserPreferences
}

const mapStateToProps = (state, props) => ({
  searchFormCollapsed: _get(state.preferences.userPreferences, 'admin.list.searchFormCollapsed', null)
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(DocsBrowserApp))

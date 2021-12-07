import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'

import {saveUserPreferences} from '../../../modules/preferences/actions'
import {menuIsOpenPrefrencesSelector} from '../../../modules/preferences/selectors'
import MenuEntry from './MenuEntry'

const mapActionCreators = {
  saveUserPreferences
}

const mapStateToProps = (state, props) => ({
  isOpen: menuIsOpenPrefrencesSelector(state, props)
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(MenuEntry))

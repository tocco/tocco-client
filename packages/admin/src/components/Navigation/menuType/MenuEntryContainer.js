import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import MenuEntry from './MenuEntry'
import {saveUserPreferences} from '../../../modules/preferences/actions'
import {menuIsOpenPrefrencesSelector} from '../../../modules/preferences/selectors'

const mapActionCreators = {
  saveUserPreferences
}

const mapStateToProps = (state, props) => ({
  isOpen: menuIsOpenPrefrencesSelector(state, props)
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(MenuEntry))

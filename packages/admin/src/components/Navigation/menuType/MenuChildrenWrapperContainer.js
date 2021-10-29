import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import MenuChildrenWrapper from './MenuChildrenWrapper'
import {menuIsOpenPrefrencesSelector} from '../../../modules/preferences/selectors'

const mapStateToProps = (state, props) => ({
  isOpen: menuIsOpenPrefrencesSelector(state, props)
})

export default connect(mapStateToProps)(injectIntl(MenuChildrenWrapper))

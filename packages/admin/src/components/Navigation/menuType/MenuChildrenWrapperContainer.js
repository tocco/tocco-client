import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'

import {menuIsOpenPrefrencesSelector} from '../../../modules/preferences/selectors'
import MenuChildrenWrapper from './MenuChildrenWrapper'

const mapStateToProps = (state, props) => ({
  isOpen: menuIsOpenPrefrencesSelector(state, props)
})

export default connect(mapStateToProps)(injectIntl(MenuChildrenWrapper))

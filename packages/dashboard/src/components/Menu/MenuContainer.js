import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import Menu from './Menu'
import {displayInfoBoxSettings, resetInfoBoxSettings} from '../../modules/dashboard/actions'

const mapActionCreators = {
  displayInfoBoxSettings,
  resetInfoBoxSettings
}

export default connect(null, mapActionCreators)(injectIntl(Menu))

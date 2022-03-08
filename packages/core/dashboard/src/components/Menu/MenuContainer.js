import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'

import {displayInfoBoxSettings, resetInfoBoxSettings} from '../../modules/dashboard/actions'
import Menu from './Menu'

const mapActionCreators = {
  displayInfoBoxSettings,
  resetInfoBoxSettings
}

export default connect(null, mapActionCreators)(injectIntl(Menu))

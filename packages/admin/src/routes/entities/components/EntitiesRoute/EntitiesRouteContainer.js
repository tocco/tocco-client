import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import EntitiesRoute from './EntitiesRoute'
import {loadCurrentRoute} from '../../modules/path/actions'

const mapActionCreators = {
  loadCurrentRoute
}

export default connect(null, mapActionCreators)(injectIntl(EntitiesRoute))

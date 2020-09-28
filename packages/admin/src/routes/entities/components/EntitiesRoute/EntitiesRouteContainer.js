import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import {hot} from 'react-hot-loader/root'

import EntitiesRoute from './EntitiesRoute'
import {loadCurrentRoute} from '../../modules/path/actions'

const mapActionCreators = {
  loadCurrentRoute
}

export default hot(connect(null, mapActionCreators)(injectIntl(EntitiesRoute)))

import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import {hot} from 'react-hot-loader/root'

import EntitiesRoute from './EntitiesRoute'
import {loadCurrentViewInfo} from '../../modules/path/actions'

const mapActionCreators = {
  loadCurrentViewInfo
}

export default hot(connect(null, mapActionCreators)(injectIntl(EntitiesRoute)))

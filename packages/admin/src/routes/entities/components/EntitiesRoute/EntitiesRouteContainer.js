import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import {hot} from 'react-hot-loader/root'

import EntitiesRoute from './EntitiesRoute'
import {loadCurrentViewInfo} from '../../modules/path/actions'

const mapStateToProps = (state, props) => ({
  currentViewInfo: state.entities.path.currentViewInfo
})

const mapActionCreators = {
  loadCurrentViewInfo
}

export default hot(connect(mapStateToProps, mapActionCreators)(injectIntl(EntitiesRoute)))

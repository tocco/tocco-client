import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import EntitiesRoute from './EntitiesRoute'
import {loadCurrentViewInfo} from '../../modules/path/actions'

const mapStateToProps = (state, props) => ({
  currentViewInfo: state.entities.path.currentViewInfo
})

const mapActionCreators = {
  loadCurrentViewInfo
}

export default connect(mapStateToProps, mapActionCreators)(injectIntl(EntitiesRoute))

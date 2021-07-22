import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import EntitiesRoute from './EntitiesRoute'
import {loadCurrentRoute} from '../../modules/path/actions'

const mapActionCreators = {
  loadCurrentRoute
}

const mapStateToProps = (state, props) => ({
  currentViewInfo: state.entities.path.currentViewInfos[props.history.location.pathname]
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(EntitiesRoute))

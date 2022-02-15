import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'

import {loadCurrentRoute} from '../../modules/path/actions'
import EntitiesRoute from './EntitiesRoute'

const mapActionCreators = {
  loadCurrentRoute
}

const mapStateToProps = (state, props) => ({
  currentViewInfo: state.entities.path.currentViewInfos[props.location.pathname]
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(EntitiesRoute))

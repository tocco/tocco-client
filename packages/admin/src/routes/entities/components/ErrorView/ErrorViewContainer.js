import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'

import EntityErrorView from './EntityErrorView'

const mapStateToProps = (state, props) => ({
  currentViewInfo: state.entities.path.currentViewInfos[props.location.pathname]
})

export default connect(mapStateToProps)(injectIntl(EntityErrorView))


import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import ErrorView from './ErrorView'

const mapStateToProps = (state, props) => ({
  currentViewInfo: state.entities.path.currentViewInfos[props.history.location.pathname]
})

export default connect(mapStateToProps)(injectIntl(ErrorView))

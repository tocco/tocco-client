import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import DetailView from './DetailView'

const mapActionCreators = {}

const mapStateToProps = (state, props) => ({
  currentViewInfo: state.entities.path.currentViewInfos[props.history.location.pathname]
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(DetailView))

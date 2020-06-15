import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import ActionView from './ActionView'
import {setCurrentViewTitle} from '../../modules/path/actions'
const mapActionCreators = {
  setCurrentViewTitle
}

const mapStateToProps = (state, props) => ({
  currentViewInfo: state.entities.path.currentViewInfos[props.history.location.pathname]
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(ActionView))

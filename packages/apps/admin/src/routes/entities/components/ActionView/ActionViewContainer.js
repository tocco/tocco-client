import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'

import {setCurrentViewTitle} from '../../modules/path/actions'
import ActionView from './ActionView'
const mapActionCreators = {
  setCurrentViewTitle
}

const mapStateToProps = (state, props) => ({
  currentViewInfo: state.entities.path.currentViewInfos[props.location.pathname]
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(ActionView))

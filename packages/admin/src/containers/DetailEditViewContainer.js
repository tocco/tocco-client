import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import DetailEditView from '../components/DetailEditView'

const mapActionCreators = {

}

const mapStateToProps = (state, props) => ({
  currentViewInfo: state.path.currentViewInfo
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(DetailEditView))

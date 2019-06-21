import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import ListView from '../components/ListView'

const mapActionCreators = {

}

const mapStateToProps = (state, props) => ({
  currentViewInfo: state.path.currentViewInfo
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(ListView))

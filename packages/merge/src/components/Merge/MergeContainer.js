import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import Merge from './Merge'
import {initialize} from '../../modules/merge/actions'

const mapActionCreators = {
  initialize
}

const mapStateToProps = (state, props) => ({
  mergeDone: !!state.merge.mergeResponse
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(Merge))

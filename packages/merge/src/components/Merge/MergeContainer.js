import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'

import {initialize} from '../../modules/merge/actions'
import Merge from './Merge'

const mapActionCreators = {
  initialize
}

const mapStateToProps = state => ({
  mergeDone: !!state.merge.mergeResponse
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(Merge))

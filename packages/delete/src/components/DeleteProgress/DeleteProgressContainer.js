import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import {doDelete} from '../../modules/delete/actions'
import DeleteProgress from './DeleteProgress'

const mapActionCreators = {
  doDelete
}

const mapStateToProps = (state, props) => ({
  dialogInfo: state.del.dialogInfo,
  navigationStrategy: state.input.navigationStrategy
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(DeleteProgress))

import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'

import {loadDialogInfo} from '../../modules/delete/actions'
import Delete from './Delete'

const mapActionCreators = {
  loadDialogInfo
}

const mapStateToProps = (state, props) => ({
  dialogInfo: state.del.dialogInfo,
  deletingInProgress: state.del.deletingInProgress
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(Delete))

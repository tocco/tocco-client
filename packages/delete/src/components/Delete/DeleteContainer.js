import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import Delete from './Delete'
import {loadDialogInfo} from '../../modules/delete/actions'

const mapActionCreators = {
  loadDialogInfo
}

const mapStateToProps = (state, props) => ({
  dialogInfo: state.del.dialogInfo,
  deletingInProgress: state.del.deletingInProgress
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(Delete))

import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'

import {doDelete, onCancel} from '../../modules/delete/actions'
import Dialog from './Dialog'

const mapActionCreators = {
  doDelete,
  onCancel
}

const mapStateToProps = (state, props) => ({
  dialogInfo: state.del.dialogInfo,
  navigationStrategy: state.input.navigationStrategy
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(Dialog))

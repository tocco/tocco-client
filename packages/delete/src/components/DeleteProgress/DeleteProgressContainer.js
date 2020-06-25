import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import {doDelete} from '../../modules/delete/actions'
import DeleteProgress from './DeleteProgress'

const mapActionCreators = {
  doDelete
}

const mapStateToProps = (state, props) => ({
  dialogInfo: state.del.dialogInfo
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(DeleteProgress))

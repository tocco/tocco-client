import {connect} from 'react-redux'

import ModalDisplay from './ModalDisplay'
import * as actions from '../actions'

const mapActionCreators = {
  close: actions.removeModal
}

const mapStateToProps = (state, props) => ({
  modals: state.notification.modal.modals
})

export default connect(mapStateToProps, mapActionCreators)(ModalDisplay)

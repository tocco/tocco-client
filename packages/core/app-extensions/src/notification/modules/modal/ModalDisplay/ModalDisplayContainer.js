import {connect} from 'react-redux'

import * as actions from '../actions'
import ModalDisplay from './ModalDisplay'

const mapActionCreators = {
  close: actions.removeModal
}

const mapStateToProps = (state, props) => ({
  modals: state.notification.modal.modals
})

export default connect(mapStateToProps, mapActionCreators)(ModalDisplay)

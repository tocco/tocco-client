import {connect} from 'react-redux'
import ModalDisplay from './ModalDisplay'
import * as actions from '../actions'

const mapActionCreators = {
  close: actions.removeModalComponent
}

const mapStateToProps = (state, props) => ({
  modal: state.notifier.modalComponents.modals[0]
})

export default connect(mapStateToProps, mapActionCreators)(ModalDisplay)

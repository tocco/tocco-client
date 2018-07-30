import {connect} from 'react-redux'
import ModalDisplay from './ModalDisplay'
import * as actions from '../actions'

const mapActionCreators = {
  close: actions.removeModalComponent
}

const mapStateToProps = (state, props) => ({
  modals: state.notifier.modalComponents.modals
})

export default connect(mapStateToProps, mapActionCreators)(ModalDisplay)

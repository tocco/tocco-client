import {connect} from 'react-redux'

import {cancelTask} from '../../center/actions'
import {removeToaster} from '../actions'
import ToasterDisplay from './ToasterDisplay'

const mapActionCreators = {
  removeToaster,
  cancelTask
}

const mapStateToProps = state => ({
  toasters: state.notification.toaster.toasters
})

export default connect(mapStateToProps, mapActionCreators)(ToasterDisplay)

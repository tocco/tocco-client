import {connect} from 'react-redux'

import {removeToaster} from '../actions'
import ToasterDisplay from './ToasterDisplay'

const mapActionCreators = {
  removeToaster
}

const mapStateToProps = state => ({
  toasters: state.notification.toaster.toasters
})

export default connect(mapStateToProps, mapActionCreators)(ToasterDisplay)

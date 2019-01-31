import {connect} from 'react-redux'

import {userActive} from '../modules/actions'
import Notifier from '../components/Notifier'

const mapActionCreators = {
  userActive
}

const mapStateToProps = state => ({
  hasNotifications: state.toastr.toastrs.length > 0
})

export default connect(mapStateToProps, mapActionCreators)(Notifier)

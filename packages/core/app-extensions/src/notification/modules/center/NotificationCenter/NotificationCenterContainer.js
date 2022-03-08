import {connect} from 'react-redux'

import {loadNotifications, markAsRead, cancelTask} from '../actions'
import NotificationCenter from './NotificationCenter'

const mapActionCreators = {
  loadNotifications,
  markAsRead,
  cancelTask
}

const mapStateToProps = state => ({
  notifications: state.notification.center.notifications,
  moreNotificationsAvailable: state.notification.center.moreNotificationsAvailable,
  isLoadingMoreNotifications: state.notification.center.isLoadingMoreNotifications
})

export default connect(mapStateToProps, mapActionCreators)(NotificationCenter)

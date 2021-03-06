import {connect} from 'react-redux'

import {loadNotifications, markAsRead} from '../actions'
import NotificationCenter from './NotificationCenter'

const mapActionCreators = {
  loadNotifications,
  markAsRead
}

const mapStateToProps = state => ({
  notifications: state.notification.center.notifications,
  moreNotificationsAvailable: state.notification.center.moreNotificationsAvailable,
  isLoadingMoreNotifications: state.notification.center.isLoadingMoreNotifications
})

export default connect(mapStateToProps, mapActionCreators)(NotificationCenter)

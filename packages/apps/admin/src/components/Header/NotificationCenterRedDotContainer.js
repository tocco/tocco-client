import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'

import NotificationCenterRedDot from './NotificationCenterRedDot'

const mapStateToProps = state => ({
  unreadNotificationKeys: state.notification.center.unreadNotificationKeys
})

export default connect(mapStateToProps, null)(injectIntl(NotificationCenterRedDot))

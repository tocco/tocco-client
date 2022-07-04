import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'

import {copyCalendarLink, fetchCalendarLinks} from '../modules/subscribeCalendar'
import SubscribeCalendarCopy from './SubscribeCalendarCopy'

const mapActionCreators = {
  copyCalendarLink,
  fetchCalendarLinks
}

const mapStateToProps = state => ({
  links: state.subscribeCalendar.links
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(SubscribeCalendarCopy))

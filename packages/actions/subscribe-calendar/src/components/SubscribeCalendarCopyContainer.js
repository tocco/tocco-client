import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'

import {copyCalendarLink, fetchCalendarLink} from '../modules/subscribeCalendar'
import SubscribeCalendarCopy from './SubscribeCalendarCopy'

const mapActionCreators = {
  copyCalendarLink,
  fetchCalendarLink
}

const mapStateToProps = state => ({
  link: state.subscribeCalendar.link
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(SubscribeCalendarCopy))

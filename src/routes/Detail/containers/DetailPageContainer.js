import { connect } from 'react-redux'
import { fetchEvent } from '../modules/activeEvent'

import DetailPage from '../components/DetailPage'

const mapStateToProps = (state, ownProps) => {
  return {
    activeEvent: state.activeEvent,
    eventKey: ownProps.routeParams.eventKey
  }
}

const mapActionCreators = {
  fetchEvent
}

export default connect(mapStateToProps, mapActionCreators)(DetailPage)

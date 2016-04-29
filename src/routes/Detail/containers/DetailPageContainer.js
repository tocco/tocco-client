import { connect } from 'react-redux'
import { fetchEvent } from '../modules/detail'
import { fetchForm } from '../../../modules/forms'

import DetailPage from '../components/DetailPage'

const mapStateToProps = (state, ownProps) => {
  return {
    detail: state.detail,
    eventKey: ownProps.routeParams.eventKey,
    forms: state.forms
  }
}

const mapActionCreators = {
  fetchEvent,
  fetchForm
}

export default connect(mapStateToProps, mapActionCreators)(DetailPage)

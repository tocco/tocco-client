import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import {
  initialize
} from '../modules/resourceScheduler/actions'
import ResourceScheduler from '../components/ResourceScheduler'

const mapActionCreators = {
  initialize
}

const mapStateToProps = (state, props) => {
  return {
    calendarTypes: state.resourceScheduler.calendarTypes
  }
}

export default connect(mapStateToProps, mapActionCreators)(injectIntl(ResourceScheduler))

import {connect} from 'react-redux'

import ValidationProgress from './ValidationProgress'
import {startValidation} from '../../modules/actions'

const mapStateToProps = state => ({
  state: state.modelValidation.state
})

const mapActionCreators = {
  startValidation
}

export default connect(mapStateToProps, mapActionCreators)(ValidationProgress)

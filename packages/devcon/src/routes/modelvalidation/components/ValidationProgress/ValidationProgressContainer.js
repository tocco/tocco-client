import {connect} from 'react-redux'

import {startValidation} from '../../modules/actions'
import ValidationProgress from './ValidationProgress'

const mapStateToProps = state => ({
  state: state.modelValidation.state
})

const mapActionCreators = {
  startValidation
}

export default connect(mapStateToProps, mapActionCreators)(ValidationProgress)

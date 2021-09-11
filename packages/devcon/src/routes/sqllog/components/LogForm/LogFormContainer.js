import {connect} from 'react-redux'

import {setActive, setElapsed} from '../../modules/actions'
import LogForm from './LogForm'

const mapStateToProps = state => ({
  active: state.sqlLog.active,
  elapsed: state.sqlLog.elapsed
})

const mapActionCreators = {
  setActive,
  setElapsed
}

export default connect(mapStateToProps, mapActionCreators)(LogForm)

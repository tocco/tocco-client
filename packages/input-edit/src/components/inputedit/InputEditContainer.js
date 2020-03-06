import {connect} from 'react-redux'

import InputEdit from './InputEdit'
import {initializeTable} from '../../modules/inputEditTable/actions'

const mapActionCreators = {
  initializeTable
}

const mapStateToProps = () => {
  return {}
}

export default connect(mapStateToProps, mapActionCreators)(InputEdit)

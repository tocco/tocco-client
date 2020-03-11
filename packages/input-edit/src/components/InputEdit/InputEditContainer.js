import {connect} from 'react-redux'

import InputEdit from './InputEdit'
import {initializeTable} from '../../modules/inputEditTable/actions'

const mapActionCreators = {
  initializeTable
}

const mapStateToProps = () => ({})

export default connect(mapStateToProps, mapActionCreators)(InputEdit)

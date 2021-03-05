import {connect} from 'react-redux'

import FileInput from './FileInput'
import {filesSelected} from '../../modules/create/actions'

const mapActionCreators = {
  onChange: filesSelected
}

const mapStateToProps = state => ({
  instanceCount: state.docs.create.dialog.instanceCount,
  directory: state.docs.create.dialog.directory
})

export default connect(mapStateToProps, mapActionCreators)(FileInput)

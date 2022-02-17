import {connect} from 'react-redux'

import {filesSelected} from '../../modules/create/actions'
import {withRouterTypeCompProvider} from '../../utils/withRouterTypeCompProvider'
import FileInput from './FileInput'

const mapActionCreators = {
  onChange: filesSelected
}

const mapStateToProps = state => ({
  instanceCount: state.docs.create.dialog.instanceCount,
  directory: state.docs.create.dialog.directory
})

export default withRouterTypeCompProvider(connect(mapStateToProps, mapActionCreators)(FileInput))

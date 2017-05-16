import {connect} from 'react-redux'
import SubGrid from '../components/SubGrid'

const mapStateToProps = (state, props) => ({
  entityKey: state.detail.entity.key,
  detailFormName: state.detail.formDefinition.name
})

export default connect(mapStateToProps, null)(SubGrid)

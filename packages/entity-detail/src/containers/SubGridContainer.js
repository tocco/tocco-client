import {connect} from 'react-redux'
import SubGrid from '../components/SubGrid'

const mapStateToProps = (state, props) => ({
  entityKey: state.entityDetail.entity.key,
  detailFormName: state.entityDetail.formDefinition.name
})

export default connect(mapStateToProps, null)(SubGrid)

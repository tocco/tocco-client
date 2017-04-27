import {connect} from 'react-redux'
import SubGrid from '../components/SubGrid'

const mapStateToProps = (state, props) => ({
  entityKey: state.detail.entity.key
})

export default connect(mapStateToProps, null)(SubGrid)

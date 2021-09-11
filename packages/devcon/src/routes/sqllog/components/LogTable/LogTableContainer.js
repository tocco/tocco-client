import {connect} from 'react-redux'

import LogTable from './LogTable'

const mapStateToProps = state => ({
  entries: state.sqlLog.entries,
  elapsed: state.sqlLog.elapsed
})

const mapActionCreators = {
}

export default connect(mapStateToProps, mapActionCreators)(LogTable)

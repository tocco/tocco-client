import {connect} from 'react-redux'

import LogTable from './LogTable'

const mapStateToProps = state => ({
  entries: state.log.entries
})

const mapActionCreators = {
}

export default connect(mapStateToProps, mapActionCreators)(LogTable)

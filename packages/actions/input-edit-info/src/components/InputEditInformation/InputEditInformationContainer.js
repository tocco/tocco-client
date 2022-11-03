import {connect} from 'react-redux'

import InputEditInformation from './InputEditInformation'

const mapStateToProps = state => ({
  information: state.inputEditInfo.information
})

export default connect(mapStateToProps)(InputEditInformation)

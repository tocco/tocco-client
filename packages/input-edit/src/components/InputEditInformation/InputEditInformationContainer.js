import {connect} from 'react-redux'

import InputEditInformation from './InputEditInformation'

const mapStateToProps = state => ({
  information: state.inputEditInformation.information
})

export default connect(mapStateToProps)(InputEditInformation)

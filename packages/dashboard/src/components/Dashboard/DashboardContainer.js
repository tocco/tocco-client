import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import {saveInfoBoxHeight, saveInfoBoxPositions} from '../../modules/dashboard/actions'
import Dashboard from './Dashboard'

const mapActionCreators = {
  saveInfoBoxPositions,
  saveInfoBoxHeight
}

const mapStateToProps = state => ({
  infoBoxes: state.dashboard.infoBoxes,
  navigationStrategy: state.input.navigationStrategy
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(Dashboard))

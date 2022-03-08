import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'

import {saveInfoBoxHeight, saveInfoBoxPositions} from '../../modules/dashboard/actions'
import Dashboard from './Dashboard'

const mapActionCreators = {
  saveInfoBoxPositions,
  saveInfoBoxHeight
}

const mapStateToProps = state => ({
  infoBoxes: state.dashboard.infoBoxes
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(Dashboard))

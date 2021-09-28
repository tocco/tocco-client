import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import AboutTocco from './AboutTocco'

const mapStateToProps = state => ({
  niceVersion: state.preferences.serverSettings.niceVersion,
  niceRevision: state.preferences.serverSettings.niceRevision
})

export default connect(mapStateToProps, null)(injectIntl(AboutTocco))

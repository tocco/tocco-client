import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import AboutTocco from './AboutTocco'

const mapStateToProps = (state, props) => ({
  niceVersion: state.session.serverSettings.niceVersion,
  niceRevision: state.session.serverSettings.niceRevision
})

export default connect(mapStateToProps, null)(injectIntl(AboutTocco))

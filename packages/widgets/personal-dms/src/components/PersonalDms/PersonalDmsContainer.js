import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'

import PersonalDms from './PersonalDms'

const mapActionCreators = {}

const mapStateToProps = state => ({
  personalFolderKey: state.personalDms.personalFolderKey,
  listLimit: state.input.listLimit,
  backendUrl: state.input.backendUrl,
  businessUnit: state.input.businessUnit,
  appContext: state.input.appContext
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(PersonalDms))

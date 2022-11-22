import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'

import PublicDms from './PublicDms'

const mapActionCreators = {}

const mapStateToProps = state => ({
  listLimit: state.input.listLimit,
  backendUrl: state.input.backendUrl,
  businessUnit: state.input.businessUnit,
  appContext: state.input.appContext,
  folderKeys: state.input.folderKeys
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(PublicDms))

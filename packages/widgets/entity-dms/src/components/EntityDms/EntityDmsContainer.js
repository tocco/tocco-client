import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'

import EntityDms from './EntityDms'

const mapActionCreators = {}

const mapStateToProps = state => ({
  folderKey: state.entityDms.folderKey,
  listLimit: state.input.listLimit,
  backendUrl: state.input.backendUrl,
  businessUnit: state.input.businessUnit,
  appContext: state.input.appContext
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(EntityDms))

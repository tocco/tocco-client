import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import DocsView from './DocsView'
import {changeListParent} from '../../modules/list/actions'

const mapStateToProps = state => ({
  domainTypes: state.input.domainTypes,
  rootNodes: state.input.rootNodes,
  limit: state.input.listLimit,
  searchFormType: state.input.searchFormType,
  selectionStyle: state.input.selectionStyle,
  getCustomLocation: state.input.getCustomLocation,
  disableViewPersistor: state.input.disableViewPersistor,
  formName: state.docs.list.formName,
  domainDetailFormName: state.input.domainDetailFormName,
  folderDetailFormName: state.input.folderDetailFormName,
  showActions: state.input.showActions,
  sortable: state.input.sortable,
  openResource: state.input.openResource
})

const mapActionCreators = {
  changeListParent
}

export default connect(mapStateToProps, mapActionCreators)(injectIntl(DocsView))

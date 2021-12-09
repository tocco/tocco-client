import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'

import {changeListParent, changeSearchFormCollapsed, changeSelection} from '../../modules/list/actions'
import DocsView from './DocsView'

const mapStateToProps = state => ({
  domainTypes: state.input.domainTypes,
  rootNodes: state.input.rootNodes,
  limit: state.input.listLimit,
  searchFormType: state.input.searchFormType,
  selectionStyle: state.input.selectionStyle,
  getCustomLocation: state.input.getCustomLocation,
  disableViewPersistor: state.input.disableViewPersistor,
  getListFormName: state.input.getListFormName,
  domainDetailFormName: state.input.domainDetailFormName,
  folderDetailFormName: state.input.folderDetailFormName,
  showActions: state.input.showActions,
  sortable: state.input.sortable,
  openResource: state.input.openResource,
  searchFormCollapsed: state.docs.list.searchFormCollapsed,
  scrollBehaviour: state.docs.list.scrollBehaviour
})

const mapActionCreators = {
  changeListParent,
  changeSelection,
  changeSearchFormCollapsed
}

export default connect(mapStateToProps, mapActionCreators)(injectIntl(DocsView))

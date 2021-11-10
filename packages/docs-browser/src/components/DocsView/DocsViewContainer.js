import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import DocsView from './DocsView'
import {changeListParent, changeSearchFormCollapsed, changeSelection} from '../../modules/list/actions'

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
  searchFormCollapsed: state.docs.list.searchFormCollapsed
})

const mapActionCreators = {
  changeListParent,
  changeSelection,
  changeSearchFormCollapsed
}

export default connect(mapStateToProps, mapActionCreators)(injectIntl(DocsView))

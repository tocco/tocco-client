import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'

import {changeListParent, changeSearchFormCollapsed, changeSelection} from '../../modules/list/actions'
import {withRouterTypeCompProvider} from '../../utils/withRouterTypeCompProvider'
import DocsView from './DocsView'

const mapStateToProps = state => ({
  domainTypes: state.input.domainTypes,
  rootNodes: state.input.rootNodes,
  limit: state.input.listLimit,
  searchFormType: state.input.searchFormType,
  selectionStyle: state.input.selectionStyle,
  selectionFilterFn: state.input.selectionFilterFn,
  getCustomLocation: state.input.getCustomLocation,
  disableViewPersistor: state.input.disableViewPersistor,
  getListFormName: state.input.getListFormName,
  domainDetailFormName: state.input.domainDetailFormName,
  folderDetailFormName: state.input.folderDetailFormName,
  showActions: state.input.showActions,
  sortable: state.input.sortable,
  openResource: state.input.openResource,
  searchFormCollapsed: state.input.searchFormCollapsed,
  scrollBehaviour: state.input.scrollBehaviour,
  selection: state.input.selection,
  locale: state.intl.locale
})

const mapActionCreators = {
  changeListParent,
  changeSelection,
  changeSearchFormCollapsed
}

export default withRouterTypeCompProvider(connect(mapStateToProps, mapActionCreators)(injectIntl(DocsView)))

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
  showActions: state.input.showActions,
  sortable: state.input.sortable
})

const mapActionCreators = {
  changeListParent
}

export default connect(mapStateToProps, mapActionCreators)(injectIntl(DocsView))

import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import EntityBrowser from '../components/EntityBrowser'
import {changePage, setSearchTerm, setOrderBy, initializeTable, refresh} from '../modules/entityBrowser/actions'

const mapActionCreators = {
  changePage,
  setSearchTerm,
  setOrderBy,
  initializeTable,
  refresh
}

const mapStateToProps = (state, props) => ({
  currentPage: state.entityBrowser.currentPage,
  orderBy: state.entityBrowser.orderBy,
  records: state.entityBrowser.records,
  searchFormDefinition: state.entityBrowser.searchFormDefinition,
  columnDefinitions: state.entityBrowser.columnDefinition,
  recordCount: state.entityBrowser.recordCount,
  limit: state.entityBrowser.limit,
  recordRequestInProgress: state.entityBrowser.recordRequestInProgress
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(EntityBrowser))


import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import EntityBrowser from '../components/EntityBrowser'
import {changePage, setOrderBy, initializeTable, refresh} from '../modules/entityBrowser/actions'

const mapActionCreators = {
  changePage,
  setOrderBy,
  initializeTable,
  refresh
}

const mapStateToProps = (state, props) => ({
  currentPage: state.entityBrowser.currentPage,
  orderBy: state.entityBrowser.orderBy,
  records: state.entityBrowser.records,
  columnDefinitions: state.entityBrowser.columnDefinition,
  recordCount: state.entityBrowser.recordCount,
  limit: state.entityBrowser.limit,
  recordRequestInProgress: state.entityBrowser.recordRequestInProgress
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(EntityBrowser))


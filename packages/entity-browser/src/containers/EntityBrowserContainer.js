import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import EntityBrowser from '../components/EntityBrowser'
import {requestRecords, setCurrentPage, initializeTable} from '../modules/entityBrowser/actions'

const mapActionCreators = {
  requestRecords,
  setCurrentPage,
  initializeTable
}

const mapStateToProps = (state, props) => ({
  currentPage: state.entityBrowser.currentPage,
  records: state.entityBrowser.records,
  columnDefinitions: state.entityBrowser.columnDefinition,
  recordCount: state.entityBrowser.recordCount
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(EntityBrowser))


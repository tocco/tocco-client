import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import ListView from '../components/ListView'
import {changePage, setOrderBy, refresh} from '../modules/listView/actions'
import {showRecordDetail} from '../modules/entityBrowser/actions'

const mapActionCreators = {
  changePage,
  setOrderBy,
  refresh,
  onRecordClick: showRecordDetail
}

const mapStateToProps = (state, props) => ({
  currentPage: state.listView.currentPage,
  orderBy: state.listView.orderBy,
  records: state.listView.records,
  columnDefinitions: state.listView.columnDefinition,
  recordCount: state.listView.recordCount,
  limit: state.listView.limit,
  inProgress: state.listView.inProgress
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(ListView))


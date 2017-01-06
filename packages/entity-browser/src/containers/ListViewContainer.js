import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import ListView from '../components/ListView'
import {changePage, setOrderBy, initializeListView, refresh} from '../modules/listView/actions'

const mapActionCreators = {
  changePage,
  setOrderBy,
  initializeListView,
  refresh
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


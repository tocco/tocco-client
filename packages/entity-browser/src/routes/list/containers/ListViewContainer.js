import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import ListView from '../components/ListView'
import {changePage, setOrderBy, refresh} from '../modules/listView/actions'

const mapActionCreators = {
  changePage,
  setOrderBy,
  refresh
}

const mapStateToProps = (state, props) => {
  return {
    currentPage: state.listView.currentPage,
    orderBy: state.listView.orderBy,
    entities: state.listView.entities,
    columnDefinitions: state.listView.columnDefinition,
    entityCount: state.listView.entityCount,
    limit: state.listView.limit,
    inProgress: state.listView.inProgress,
    showSearchForm: state.entityBrowser.showSearchForm
  }
}

export default connect(mapStateToProps, mapActionCreators)(injectIntl(ListView))


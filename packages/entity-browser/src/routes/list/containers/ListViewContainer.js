import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import ListView from '../components/ListView'
import {initialize, changePage, setOrderBy, refresh} from '../modules/actions'

const mapActionCreators = {
  initialize,
  changePage,
  setOrderBy,
  refresh
}

const mapStateToProps = (state, props) => {
  return {
    currentPage: state.list.currentPage,
    orderBy: state.list.orderBy,
    entities: state.list.entities,
    columnDefinitions: state.list.columnDefinition,
    entityCount: state.list.entityCount,
    limit: state.list.limit,
    inProgress: state.list.inProgress,
    showSearchForm: state.list.showSearchForm
  }
}

export default connect(mapStateToProps, mapActionCreators)(injectIntl(ListView))

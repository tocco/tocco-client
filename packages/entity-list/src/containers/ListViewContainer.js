import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import ListView from '../components/ListView'
import {initialize, changePage, setSorting, refresh, onRowClick} from '../modules/list/actions'

const mapActionCreators = {
  initialize,
  changePage,
  setSorting,
  refresh,
  onRowClick
}

const mapStateToProps = (state, props) => {
  return {
    currentPage: state.list.currentPage,
    sorting: state.list.sorting,
    entities: state.list.entities,
    columnDefinitions: state.list.columnDefinition,
    entityCount: state.list.entityCount,
    limit: state.list.limit,
    inProgress: state.list.inProgress
  }
}

export default connect(mapStateToProps, mapActionCreators)(injectIntl(ListView))

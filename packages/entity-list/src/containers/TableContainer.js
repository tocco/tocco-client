import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import Table from '../components/Table'
import {changePage, initialize, onRowClick, setSorting} from '../modules/list/actions'

const mapActionCreators = {
  initialize,
  changePage,
  setSorting,
  onRowClick
}

const mapStateToProps = (state, props) => ({
  currentPage: state.list.currentPage,
  sorting: state.list.sorting,
  entities: state.list.entities,
  entityCount: state.list.entityCount,
  limit: state.list.limit,
  inProgress: state.list.inProgress
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(Table))

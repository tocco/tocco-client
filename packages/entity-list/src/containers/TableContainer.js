import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import Table from '../components/Table'
import {
  changePage,
  initialize,
  onRowClick,
  setSorting,
  setSelectable,
  onSelectChange,
  setSelection,
  refresh
} from '../modules/list/actions'

const mapActionCreators = {
  initialize,
  changePage,
  setSorting,
  onRowClick,
  setSelectable,
  onSelectChange,
  setSelection,
  refresh
}

const mapStateToProps = (state, props) => ({
  currentPage: state.list.currentPage,
  sorting: state.list.sorting,
  entities: state.list.entities,
  entityCount: state.list.entityCount,
  limit: state.list.limit,
  inProgress: state.list.inProgress,
  selectable: state.list.selectable,
  selection: state.list.selection,
  parent: state.entityList.parent
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(Table))

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
  setSelection
} from '../modules/list/actions'

const mapActionCreators = {
  initialize,
  changePage,
  setSorting,
  onRowClick,
  setSelectable,
  onSelectChange,
  setSelection
}

const mapStateToProps = (state, props) => ({
  currentPage: state.list.currentPage,
  sorting: state.list.sorting,
  entities: state.list.entities,
  entityCount: state.list.entityCount,
  limit: state.list.limit,
  inProgress: state.list.inProgress,
  selectable: state.list.selectable,
  selection: state.list.selection
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(Table))

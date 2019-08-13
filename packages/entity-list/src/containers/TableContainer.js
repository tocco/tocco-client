import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import Table from '../components/Table'
import {
  changePage,
  initialize,
  onRowClick,
  setSorting,
  setSelectable,
  refresh
} from '../modules/list/actions'
import {
  onSelectChange,
  setSelection
} from '../modules/selection/actions'

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
  tableSelectionStyle: state.selection.tableSelectionStyle,
  selection: state.selection.selection,
  parent: state.entityList.parent,
  showLink: state.list.showLink,
  linkFactory: state.formData.linkFactory.linkFactory
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(Table))

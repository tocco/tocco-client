import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import ListView from '../components/ListView'
import {changePage, setOrderBy, refresh} from '../modules/listView/actions'
import {showEntityDetail} from '../modules/entityBrowser/actions'

const mapActionCreators = {
  changePage,
  setOrderBy,
  refresh,
  onEntityClick: showEntityDetail
}

const mapStateToProps = (state, props) => ({
  currentPage: state.listView.currentPage,
  orderBy: state.listView.orderBy,
  entities: state.listView.entities,
  columnDefinitions: state.listView.columnDefinition,
  entityCount: state.listView.entityCount,
  limit: state.listView.limit,
  inProgress: state.listView.inProgress
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(ListView))


import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'

import {initialize, setSearchFormCollapsed} from '../../modules/entityList/actions'
import {loadPreferences} from '../../modules/preferences/actions'
import {initialize as initializeSearchForm} from '../../modules/searchForm/actions'
import EntityList from './EntityList'

const mapActionCreators = {
  initialize,
  initializeSearchForm,
  loadPreferences,
  setSearchFormCollapsed
}

const mapStateToProps = state => ({
  searchFormType: state.input.searchFormType,
  searchFormPosition: state.entityList.searchFormPosition,
  searchFormCollapsed: state.entityList.searchFormCollapsed,
  scrollBehaviour: state.entityList.scrollBehaviour
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(EntityList))

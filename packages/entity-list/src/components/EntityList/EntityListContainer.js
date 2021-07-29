import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import EntityList from './EntityList'
import {initialize, setSearchFormCollapsed} from '../../modules/entityList/actions'
import {initialize as initializeSearchForm} from '../../modules/searchForm/actions'
import {loadPreferences} from '../../modules/preferences/actions'

const mapActionCreators = {
  initialize,
  initializeSearchForm,
  loadPreferences,
  setSearchFormCollapsed
}

const mapStateToProps = state => ({
  searchFormType: state.input.searchFormType,
  searchFormPosition: state.input.searchFormPosition,
  searchFormCollapsed: state.entityList.searchFormCollapsed
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(EntityList))

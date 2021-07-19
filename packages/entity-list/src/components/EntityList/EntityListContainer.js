import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import EntityList from './EntityList'
import {initialize, searchFormCollapsedChange} from '../../modules/entityList/actions'
import {initialize as initializeSearchForm} from '../../modules/searchForm/actions'
import {loadPreferences} from '../../modules/preferences/actions'

const mapActionCreators = {
  initialize,
  initializeSearchForm,
  loadPreferences,
  searchFormCollapsedChange
}

const mapStateToProps = state => ({
  searchFormType: state.input.searchFormType,
  searchFormPosition: state.input.searchFormPosition,
  searchFormCollapsedDefault: state.input.searchFormCollapsed
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(EntityList))

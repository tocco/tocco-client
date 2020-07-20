import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import {hot} from 'react-hot-loader/root'

import EntityList from './EntityList'
import {initialize} from '../../modules/entityList/actions'
import {initialize as initializeSearchForm} from '../../modules/searchForm/actions'
import {loadPreferences} from '../../modules/preferences/actions'

const mapActionCreators = {
  initialize,
  initializeSearchForm,
  loadPreferences
}

const mapStateToProps = state => ({
  searchFormType: state.input.searchFormType,
  searchFormPosition: state.input.searchFormPosition
})

export default hot(connect(mapStateToProps, mapActionCreators)(injectIntl(EntityList)))

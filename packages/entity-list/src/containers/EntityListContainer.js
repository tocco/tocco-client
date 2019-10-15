import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import {hot} from 'react-hot-loader/root'

import EntityList from '../components/EntityList'
import {initialize} from '../modules/entityList/actions'
import {initialize as initializeSearchForm} from '../modules/searchForm/actions'
const mapActionCreators = {
  initialize,
  initializeSearchForm
}

const mapStateToProps = state => ({
  searchFormType: state.input.searchFormType,
  searchFormPosition: state.input.searchFormPosition,
  showSelectionController: state.selection.showSelectionController
})

export default hot(connect(mapStateToProps, mapActionCreators)(injectIntl(EntityList)))

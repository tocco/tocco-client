import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import EntityList from '../components/EntityList'
import {initialize} from '../modules/entityList/actions'
import {initialize as initializeSearchForm} from '../modules/searchForm/actions'
const mapActionCreators = {
  initialize,
  initializeSearchForm
}

const mapStateToProps = (state, props) => ({
  showSearchForm: state.input.showSearchForm
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(EntityList))

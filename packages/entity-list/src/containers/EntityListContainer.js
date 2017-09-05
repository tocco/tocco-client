import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import EntityList from '../components/EntityList'
import {initialize, navigateToCreate} from '../modules/entityList/actions'

const mapActionCreators = {
  initialize,
  navigateToCreate
}

const mapStateToProps = (state, props) => ({
  showSearchForm: state.input.showSearchForm
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(EntityList))

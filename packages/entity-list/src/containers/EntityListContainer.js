import {connect} from 'react-redux'
import EntityList from '../components/EntityList'
import {initialize} from '../modules/entityList/actions'

const mapActionCreators = {
  initialize
}

const mapStateToProps = (state, props) => ({
  showSearchForm: state.input.showSearchForm
})

export default connect(mapStateToProps, mapActionCreators)(EntityList)

import {connect} from 'react-redux'

import InputEditSearch from './InputEditSearch'
import {setSearchQueries} from '../../modules/inputEditSearch/actions'

const mapActionCreators = {
  setSearchFields: setSearchQueries
}

const mapStateToProps = state => ({
  form: state.inputEditSearch.form,
  model: state.inputEditSearch.model
})

export default connect(mapStateToProps, mapActionCreators)(InputEditSearch)

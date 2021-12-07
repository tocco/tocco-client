import {connect} from 'react-redux'

import {setSearchQueries} from '../../modules/inputEditSearch/actions'
import InputEditSearch from './InputEditSearch'

const mapActionCreators = {
  setSearchFields: setSearchQueries
}

const mapStateToProps = state => ({
  form: state.inputEditSearch.form
})

export default connect(mapStateToProps, mapActionCreators)(InputEditSearch)

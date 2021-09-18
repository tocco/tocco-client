import {connect} from 'react-redux'

import SqlDialog from './SqlDialog'
import {setSql, executeSql} from '../../modules/actions'

const mapStateToProps = state => ({
  sql: state.modelValidation.sql
})

const mapActionCreators = {
  setSql,
  executeSql
}

export default connect(mapStateToProps, mapActionCreators)(SqlDialog)

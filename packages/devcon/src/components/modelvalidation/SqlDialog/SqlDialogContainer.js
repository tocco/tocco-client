import {connect} from 'react-redux'

import {setSql, executeSql} from '../../../modules/modelvalidation/actions'
import SqlDialog from './SqlDialog'

const mapStateToProps = state => ({
  sql: state.modelValidation.sql
})

const mapActionCreators = {
  setSql,
  executeSql
}

export default connect(mapStateToProps, mapActionCreators)(SqlDialog)

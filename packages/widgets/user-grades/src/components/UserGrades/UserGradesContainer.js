import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'

import UserGrades from './UserGrades'

const mapActionCreators = {}

const mapStateToProps = state => ({
  reportIds: state.input.reportIds,
  searchFilters: state.input.searchFilters,
  limit: state.input.limit,
  backendUrl: state.input.backendUrl,
  businessUnit: state.input.businessUnit,
  appContext: state.input.appContext,
  searchFormType: state.input.searchFormType
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(UserGrades))

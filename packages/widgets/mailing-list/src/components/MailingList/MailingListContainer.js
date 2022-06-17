import {connect} from 'react-redux'

import MailingList from './MailingList'

const mapActionCreators = {}

const mapStateToProps = state => ({
  searchFormType: state.input.searchFormType,
  searchFilters: state.input.searchFilters,
  limit: state.input.limit,
  backendUrl: state.input.backendUrl,
  businessUnit: state.input.businessUnit,
  appContext: state.input.appContext
})

export default connect(mapStateToProps, mapActionCreators)(MailingList)

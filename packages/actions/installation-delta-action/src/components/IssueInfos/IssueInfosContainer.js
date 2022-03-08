import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'

import IssueInfos from './IssueInfos'

const mapActionCreators = {}

const mapStateToProps = state => ({
  issueUrl: state.input.issueUrl
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(IssueInfos))

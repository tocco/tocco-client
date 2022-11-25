import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'

import {fetchData, fetchFileContent} from '../modules/log'
import Log from './Log'

const mapActionCreators = {
  fetchData,
  fetchFileContent
}

const mapStateToProps = state => ({
  data: state.log.data,
  fileContent: state.log.fileContent
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(Log))

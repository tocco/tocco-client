import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'

import {fetchData, postData} from '../modules/configuration'
import Configuration from './Configuration'

const mapActionCreators = {
  fetchData,
  postData
}

const mapStateToProps = state => ({
  data: state.configuration.data,
  isLoading: state.configuration.isLoading
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(Configuration))

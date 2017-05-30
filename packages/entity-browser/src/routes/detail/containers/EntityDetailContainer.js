import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import EntityDetail from '../components/EntityDetail'

import {loadDetailParams, clearDetailParams} from '../modules/actions'

const mapActionCreators = {
  loadDetailParams,
  clearDetailParams
}

const mapStateToProps = (state, props) => {
  return {
    detailParams: state.detail.detailParams
  }
}

export default connect(mapStateToProps, mapActionCreators)(injectIntl(EntityDetail))

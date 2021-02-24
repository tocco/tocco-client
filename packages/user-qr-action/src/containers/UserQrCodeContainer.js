import {connect} from 'react-redux'

import UserQrCode from '../components/UserQrCode'
import {fetchData} from '../modules/qrCode'

const mapActionCreators = {
  fetchData
}

const mapStateToProps = state => ({
  data: state.qrCode.data
})

export default connect(mapStateToProps, mapActionCreators)(UserQrCode)

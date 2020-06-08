import {connect} from 'react-redux'
import {hot} from 'react-hot-loader/root'

import UserQrCode from '../components/UserQrCode'
import {fetchData} from '../modules/qrCode'

const mapActionCreators = {
  fetchData
}

const mapStateToProps = state => ({
  data: state.qrCode.data
})

export default hot(connect(mapStateToProps, mapActionCreators)(UserQrCode))

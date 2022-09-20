import {connect} from 'react-redux'

import {fetchData} from '../../modules/leaderboard'
import Leaderboard from './Leaderboard'

const mapActionCreators = {
  fetchData
}

const mapStateToProps = state => ({
  data: state.leaderboard.data
})

export default connect(mapStateToProps, mapActionCreators)(Leaderboard)

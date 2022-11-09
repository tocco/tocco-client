import {connect} from 'react-redux'

import {fetchData} from '../modules/scoreboard'
import Scoreboard from './Scoreboard'

const mapActionCreators = {
  fetchData
}

const mapStateToProps = state => ({
  data: state.scoreboard.data // gleicher name wie bei reducer
})

export default connect(mapStateToProps, mapActionCreators)(Scoreboard)

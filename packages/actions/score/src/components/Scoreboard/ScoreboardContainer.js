import {connect} from 'react-redux'

import {fetchData} from '../../modules/scoreboard'
import Scoreboard from './'

const mapActionCreators = {
  fetchData
}

const mapStateToProps = state => ({
  data: state.scoreboard.data
})

export default connect(mapStateToProps, mapActionCreators)(Scoreboard)

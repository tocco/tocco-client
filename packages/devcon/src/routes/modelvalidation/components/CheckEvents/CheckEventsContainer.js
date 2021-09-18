import {connect} from 'react-redux'

import CheckEvents from './CheckEvents'
import {setSelected, generateSql, generateChangelog} from '../../modules/actions'

const mapStateToProps = state => ({
  checkEvents: state.modelValidation.checkEvents,
  selection: state.modelValidation.selection
})

const mapActionCreators = {
  setSelected,
  generateSql,
  generateChangelog
}

export default connect(mapStateToProps, mapActionCreators)(CheckEvents)

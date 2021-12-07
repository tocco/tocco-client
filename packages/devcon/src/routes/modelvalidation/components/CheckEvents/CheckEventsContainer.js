import {connect} from 'react-redux'

import {setSelected, generateSql, generateChangelog} from '../../modules/actions'
import CheckEvents from './CheckEvents'

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

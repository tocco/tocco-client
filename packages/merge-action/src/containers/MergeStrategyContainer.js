import { connect } from 'react-redux'
import MergeStrategy from '../components/MergeStrategy'
import {changeOptionValue, activateOption} from '../modules/mergeStrategy/options/actions'

const mapActionCreators = {
  changeOptionValue: changeOptionValue,
  activateOption: activateOption
}

const mapStateToProps = (state) => {
  return {
    options: state.mergeStrategy.options
  }
}

export default connect(mapStateToProps, mapActionCreators)(MergeStrategy)


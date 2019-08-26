import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import MergeStrategy from '../components/MergeStrategy'
import {changeEditOptionValue, activateEditOption} from '../modules/mergeStrategy/editOptions/actions'
import {changeStrategy} from '../modules/mergeStrategy/strategies/actions'

const mapActionCreators = {
  changeEditOptionValue,
  activateEditOption,
  changeStrategy
}

const mapStateToProps = state => {
  return {
    editOptions: state.mergeStrategy.editOptions,
    strategies: state.mergeStrategy.strategies
  }
}

export default connect(mapStateToProps, mapActionCreators)(injectIntl(MergeStrategy))

import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'

import {setTargetEntity} from '../../modules/merge/actions'
import ColumnHeaderRenderer from './ColumnHeaderRenderer'

const mapActionCreatorsColumn = {
  setTargetEntity
}

const mapStateToPropsColumn = state => ({
  targetEntity: state.merge.selected.targetEntity,
  mergeStrategyDisplay: state.merge.sourceData.mergeStrategyDisplay
})

export default connect(mapStateToPropsColumn, mapActionCreatorsColumn)(injectIntl(ColumnHeaderRenderer))

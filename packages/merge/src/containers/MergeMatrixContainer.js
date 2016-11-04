import { connect } from 'react-redux'
import {injectIntl} from 'react-intl'
import {changeTargetEntity} from '../modules/mergeMatrix/actions'
import {selectSourceField, selectSourceRelation} from '../modules/mergeMatrix/selections'
import MergeMatrix from '../components/MergeMatrix'
import {toggleRelationMany} from '../modules/mergeMatrix/selections/actions'

const mapActionCreators = {
  changeTargetEntity,
  selectSourceField,
  selectSourceRelation,
  toggleRelationMany
}

const mapStateToProps = state => {
  return {
    entities: state.mergeMatrix.entities,
    model: state.mergeMatrix.model,
    targetEntityPk: state.mergeMatrix.targetEntityPk,
    selections: state.mergeMatrix.selections
  }
}

export default connect(mapStateToProps, mapActionCreators)(injectIntl(MergeMatrix))


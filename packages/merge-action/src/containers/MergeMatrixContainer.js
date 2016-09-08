import { connect } from 'react-redux'
import {changeTargetEntity, saveMerge} from '../modules/MergeMatrix/actions'
import {selectSourceField, selectSourceRelation} from '../modules/MergeMatrix/selections'
import MergeMatrix from '../components/MergeMatrix'
import {toggleRelationMany} from '../modules/MergeMatrix/selections/actions'

const mapActionCreators = {
  changeTargetEntity,
  saveMerge,
  selectSourceField,
  selectSourceRelation,
  toggleRelationMany
}

const mapStateToProps = (state) => {
  return {
    entities: state.mergeMatrix.entities,
    model: state.mergeMatrix.model,
    targetEntityPk: state.mergeMatrix.targetEntityPk,
    selections: state.mergeMatrix.selections
  }
}

export default connect(mapStateToProps, mapActionCreators)(MergeMatrix)


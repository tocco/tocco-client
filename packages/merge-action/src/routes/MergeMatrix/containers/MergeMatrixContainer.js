import { connect } from 'react-redux'
import {changeTargetEntity} from '../modules/actions'
import {selectSourceField, selectSourceRelation} from '../modules/selections'
import MergeMatrix from '../components/MergeMatrix'
import {saveMerge} from '../modules/actions'
import {toggleRelationMany} from '../modules/selections/actions'

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


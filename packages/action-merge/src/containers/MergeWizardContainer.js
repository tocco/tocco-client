import { connect } from 'react-redux'
import MergeWizard from './../components/MergeWizard'
import {saveMerge} from '../modules/wizard/actions'

const mapActionCreators = {
  saveMerge
}

const mapStateToProps = state => {
  return {
    mergeResponse: state.wizard.mergeResponse
  }
}

export default connect(mapStateToProps, mapActionCreators)(MergeWizard)


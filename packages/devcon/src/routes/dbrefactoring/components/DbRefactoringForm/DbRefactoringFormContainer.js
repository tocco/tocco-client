import {connect} from 'react-redux'

import DbRefactoringForm from './DbRefactoringForm'
import {
  loadModules,
  loadFragments,
  setSelectedModules,
  setFragmentSelected,
  setVersion,
  setIgnoreErrors,
  executeDbRefactoring
} from '../../modules/actions'

const mapStateToProps = state => ({
  version: state.dbRefactoring.version,
  modules: state.dbRefactoring.modules,
  selectedModules: state.dbRefactoring.selectedModules,
  fragments: state.dbRefactoring.fragments,
  selectedFragments: state.dbRefactoring.selectedFragments,
  ignoreErrors: state.dbRefactoring.ignoreErrors,
  running: state.dbRefactoring.running
})

const mapActionCreators = {
  loadModules,
  loadFragments,
  setSelectedModules,
  setFragmentSelected,
  setVersion,
  setIgnoreErrors,
  executeDbRefactoring
}

export default connect(mapStateToProps, mapActionCreators)(DbRefactoringForm)

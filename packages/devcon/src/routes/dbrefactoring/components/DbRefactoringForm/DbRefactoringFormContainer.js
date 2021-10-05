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

const mapStateToProps = state => {
  const {
    dbRefactoring, languageUpgrade
  } = state.dbRefactoring

  return {
    version: dbRefactoring.version,
    modules: dbRefactoring.modules,
    selectedModules: dbRefactoring.selectedModules,
    fragments: dbRefactoring.fragments,
    selectedFragments: dbRefactoring.selectedFragments,
    ignoreErrors: dbRefactoring.ignoreErrors,
    running: dbRefactoring.running,
    disabled: dbRefactoring.running || languageUpgrade.running
  }
}

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

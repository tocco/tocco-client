import {connect} from 'react-redux'

import {setLanguage, executeLanguageUpgrade} from '../../../modules/dbrefactoring/actions'
import UpgradeLanguageForm from './UpgradeLanguageForm'

const mapStateToProps = state => {
  const {dbRefactoring, languageUpgrade} = state.dbRefactoring

  return {
    language: languageUpgrade.language,
    running: languageUpgrade.running,
    disabled: languageUpgrade.running || dbRefactoring.running
  }
}

const mapActionCreators = {
  setLanguage,
  executeLanguageUpgrade
}

export default connect(mapStateToProps, mapActionCreators)(UpgradeLanguageForm)

import React from 'react'
import {Typography} from 'tocco-ui'

import DbRefactoringForm from '../DbRefactoringForm'
import UpgradeLanguageForm from '../UpgradeLanguageForm'

const DbRefactoring = () => (
  <>
    <Typography.H1>Database Refactoring</Typography.H1>
    <DbRefactoringForm/>
    <Typography.H1>Language Upgrade</Typography.H1>
    <UpgradeLanguageForm/>
  </>
)

export default DbRefactoring

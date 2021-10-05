import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {StatedValue, Select, Button} from 'tocco-ui'

import {StyledInput, StyledInputWrapper} from '../StyledInput'
import Fragments from './Fragments'

const DbRefactoringForm = ({
  version,
  modules,
  selectedModules,
  fragments,
  selectedFragments,
  ignoreErrors,
  running,
  disabled,
  executeDbRefactoring,
  loadModules,
  loadFragments,
  setSelectedModules,
  setFragmentSelected,
  setVersion,
  setIgnoreErrors
}) => {
  useEffect(() => {
    if (modules.length === 0) {
      loadModules()
    }
    if (fragments.length === 0) {
      loadFragments()
    }
  }, [])

  const handleVersionChange = e => {
    const versionStr = e.target.value.replaceAll(/[^\d\\.]/g, '')
    setVersion(versionStr)
  }

  const handleIgnoreErrorsChange = e => {
    setIgnoreErrors(e.target.checked)
  }

  const handleSubmit = e => {
    e.preventDefault()
    executeDbRefactoring()
  }

  return (
    <form onSubmit={handleSubmit}>
      <StatedValue label="Modules (none selected => all)" hasValue={selectedModules.length > 0}>
          <Select options={modules} value={selectedModules} onChange={setSelectedModules} isMulti immutable={disabled}/>
      </StatedValue>
      <StatedValue label="Fragments" fixLabel>
        <Fragments
          fragments={fragments}
          selectedFragments={selectedFragments}
          disabled={disabled}
          setFragmentSelected={setFragmentSelected}
        />
      </StatedValue>
      <StatedValue label="Version" hasValue={version.length > 0}>
        <StyledInputWrapper>
          <StyledInput value={version} onChange={handleVersionChange} disabled={disabled}/>
        </StyledInputWrapper>
      </StatedValue>
      <StatedValue label="Ignore errors" fixLabel>
        <input type="checkbox" checked={ignoreErrors} onChange={handleIgnoreErrorsChange} disabled={disabled}/>
      </StatedValue>
      <Button type="submit" label="Execute" look="raised" pending={running} disabled={disabled}/>
    </form>
  )
}

DbRefactoringForm.propTypes = {
  version: PropTypes.string.isRequired,
  modules: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    display: PropTypes.string
  })).isRequired,
  selectedModules: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    display: PropTypes.string
  })).isRequired,
  fragments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string
  })).isRequired,
  selectedFragments: PropTypes.arrayOf(PropTypes.string).isRequired,
  ignoreErrors: PropTypes.bool.isRequired,
  running: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  executeDbRefactoring: PropTypes.func.isRequired,
  loadModules: PropTypes.func.isRequired,
  loadFragments: PropTypes.func.isRequired,
  setSelectedModules: PropTypes.func.isRequired,
  setFragmentSelected: PropTypes.func.isRequired,
  setVersion: PropTypes.func.isRequired,
  setIgnoreErrors: PropTypes.func.isRequired
}

export default DbRefactoringForm

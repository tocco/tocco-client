import React from 'react'
import PropTypes from 'prop-types'
import {StatedValue, Button} from 'tocco-ui'

import {StyledInput, StyledInputWrapper} from '../StyledInput'

const UpgradeLanguageForm = ({
  language,
  running,
  disabled,
  executeLanguageUpgrade,
  setLanguage
}) => {
  const handleLanguageChange = e => {
    setLanguage(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    executeLanguageUpgrade()
  }

  return (
    <form onSubmit={handleSubmit}>
      <StatedValue label="Language" hasValue={language.length > 0}>
        <StyledInputWrapper>
          <StyledInput value={language} onChange={handleLanguageChange} disabled={disabled}/>
        </StyledInputWrapper>
      </StatedValue>
      <Button type="submit" label="Execute language upgrade" look="raised" pending={running} disabled={disabled}/>
    </form>
  )
}

UpgradeLanguageForm.propTypes = {
  language: PropTypes.string.isRequired,
  running: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  executeLanguageUpgrade: PropTypes.func.isRequired,
  setLanguage: PropTypes.func.isRequired
}

export default UpgradeLanguageForm

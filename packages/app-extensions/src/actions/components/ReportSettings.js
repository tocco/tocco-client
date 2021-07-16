import React, {useState, useMemo} from 'react'
import PropTypes from 'prop-types'
import {Button} from 'tocco-ui'
import {FormattedMessage, injectIntl} from 'react-intl'

import simpleFormConnector from '../containers/simpleFormConnector'
import {
  getFormDefinition,
  getGroupedValues,
  reportSettingsDefinitionPropType,
  transformValues
} from '../utils/report'
import {StyledStickyButtons, StyledReportSettings} from './StyledReportSettings'

export const ReportSettings = ({settingsDefinition, formApp, onSubmit, listApp, intl}) => {
  const customSettingsDefined = settingsDefinition.customSettings && settingsDefinition.customSettings.entity
  const [settingsChange, setSettingsChange] = useState({
    valid: false,
    customSettingsValid: !customSettingsDefined
  })

  const SimpleFormContainer = useMemo(() => simpleFormConnector(formApp), [])

  const handleSettingsChange = (values, valid) => {
    setSettingsChange({
      ...settingsChange,
      values,
      valid
    })
  }

  const handleCustomSettingsChange = (customSettings, customSettingsValid) => {
    setSettingsChange({
      ...settingsChange,
      customSettings,
      customSettingsValid
    })
  }

  const handleButtonClick = () => {
    const groupedValues = {
      ...getGroupedValues(settingsDefinition, transformValues(settingsChange.values)),
      customSettings: settingsChange.customSettings
    }

    onSubmit(groupedValues)
  }

  return (
    <StyledReportSettings>
      <SimpleFormContainer
        listApp={listApp}
        form={getFormDefinition(settingsDefinition, intl)}
        noButtons
        onChange={({values, valid}) => {
          handleSettingsChange(values, valid)
        }}
        mode="create"
      />
      {customSettingsDefined
      && <SimpleFormContainer
        listApp={listApp}
        form={settingsDefinition.customSettings.form.form}
        noButtons
        onChange={({values, valid}) => {
          handleCustomSettingsChange(values, valid)
        }}
        mode="create"
      />
      }
      <StyledStickyButtons>
        <Button
          ink="primary"
          disabled={!settingsChange.customSettingsValid || !settingsChange.valid}
          onClick={handleButtonClick}
          look="raised"
        >
          <FormattedMessage id="client.common.report.generate"/>
        </Button>
      </StyledStickyButtons>
    </StyledReportSettings>
  )
}

ReportSettings.propTypes = {
  intl: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  listApp: PropTypes.func.isRequired,
  formApp: PropTypes.func.isRequired,
  settingsDefinition: reportSettingsDefinitionPropType.isRequired
}

export default injectIntl(ReportSettings)

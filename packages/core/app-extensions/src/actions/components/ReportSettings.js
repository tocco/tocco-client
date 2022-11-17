import PropTypes from 'prop-types'
import {useState, useMemo} from 'react'
import {FormattedMessage, injectIntl} from 'react-intl'
import {Button} from 'tocco-ui'

import simpleFormConnector from '../containers/simpleFormConnector'
import {getFormDefinition, getGroupedValues, reportSettingsDefinitionPropType, transformValues} from '../utils/report'
import {StyledStickyButtons, StyledReportSettings} from './StyledReportSettings'

export const ReportSettings = ({settingsDefinition, formApp, onSubmit, listApp, docsApp, intl}) => {
  const customSettingsDefined = settingsDefinition.customSettings && settingsDefinition.customSettings.entity
  const [settings, setSettings] = useState({
    valid: false,
    customSettingsValid: !customSettingsDefined
  })

  const SimpleFormContainer = useMemo(() => simpleFormConnector(formApp), [formApp])

  const handleSettingsChange = ({values, valid}) => {
    setSettings(s => ({
      ...s,
      values,
      valid
    }))
  }

  const handleCustomSettingsChange = ({values, valid}) => {
    setSettings(s => ({
      ...s,
      customSettings: values,
      customSettingsValid: valid
    }))
  }

  const handleButtonClick = () => {
    const groupedValues = {
      ...getGroupedValues(settingsDefinition, transformValues(settings.values)),
      customSettings: settings.customSettings
    }

    onSubmit(groupedValues)
  }

  return (
    <StyledReportSettings>
      <SimpleFormContainer
        listApp={listApp}
        docsApp={docsApp}
        form={getFormDefinition(settingsDefinition, intl)}
        noButtons
        onChange={handleSettingsChange}
        mode="create"
      />
      {customSettingsDefined && (
        <SimpleFormContainer
          listApp={listApp}
          docsApp={docsApp}
          form={settingsDefinition.customSettings.form.form}
          noButtons
          onChange={handleCustomSettingsChange}
          mode="create"
        />
      )}
      <StyledStickyButtons>
        <Button
          ink="primary"
          disabled={!settings.customSettingsValid || !settings.valid}
          onClick={handleButtonClick}
          look="raised"
        >
          <FormattedMessage id="client.common.report.generate" />
        </Button>
      </StyledStickyButtons>
    </StyledReportSettings>
  )
}

ReportSettings.propTypes = {
  intl: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  listApp: PropTypes.func.isRequired,
  docsApp: PropTypes.func.isRequired,
  formApp: PropTypes.func.isRequired,
  settingsDefinition: reportSettingsDefinitionPropType.isRequired
}

export default injectIntl(ReportSettings)

import React from 'react'
import PropTypes from 'prop-types'
import {Button, ButtonGroup} from 'tocco-ui'
import {FormattedMessage, intlShape} from 'react-intl'
import {download} from 'tocco-util'

import rest from '../../rest'
import simpleFormConnector from '../containers/simpleFormConnector'
import {
  getFormDataDefaults,
  getModel,
  getFormDefinition,
  getGroupedValues,
  reportSettingsDefinitionPropType,
  transformValues,
  submitActions
} from '../utils/report'
import StyledReportSettings from './StyledReportSettings'

class ReportSettings extends React.Component {
  constructor(props) {
    super(props)

    this.customSettingsDefined
      = props.settingsDefinition.customSettings && props.settingsDefinition.customSettings.entity
    this.state = {
      valid: false,
      customSettingsValid: !this.customSettingsDefined
    }

    this.SimpleFormContainer = simpleFormConnector(props.formApp)
  }

  handleSettingsChange = (values, valid) => {
    this.setState({...this.state, values, valid})
  }

  handleCustomSettingsChange = (customSettings, customSettingsValid) => {
    this.setState({...this.state, customSettings, customSettingsValid})
  }

  handleButtonClick = action => () => {
    const groupedValues = {
      ...getGroupedValues(this.props.settingsDefinition, transformValues(this.state.values)),
      customSettings: this.state.customSettings
    }

    this.props.onSubmit(action, groupedValues)
  }

  render() {
    const {settingsDefinition} = this.props

    return (
      <StyledReportSettings>
        <this.SimpleFormContainer
          listApp={this.props.listApp}
          form={getFormDefinition(settingsDefinition, this.context.intl)}
          model={getModel(settingsDefinition)}
          noButtons
          onChange={({values, valid}) => { this.handleSettingsChange(values, valid) }}
          formData={getFormDataDefaults(settingsDefinition)}
        />
        {this.customSettingsDefined
        && <this.SimpleFormContainer
          listApp={this.props.listApp}
          form={settingsDefinition.customSettings.form.form}
          model={rest.defaultModelTransformer(settingsDefinition.customSettings.entity)}
          noButtons
          onChange={({values, valid}) => { this.handleCustomSettingsChange(values, valid) }}
        />
        }
        <ButtonGroup>
          {download.downloadSupportedByBrowser()
          && <Button
            ink="primary"
            disabled={!this.state.customSettingsValid || !this.state.valid}
            icon="file-download"
            onClick={this.handleButtonClick(submitActions.DOWNLOAD)}
          >
            <FormattedMessage id="client.common.report.download"/>
          </Button>
          }
          <Button
            disabled={!this.state.customSettingsValid || !this.state.valid}
            icon="file"
            onClick={this.handleButtonClick(submitActions.DISPLAY)}
          >
            <FormattedMessage id="client.common.report.display"/>
          </Button>
        </ButtonGroup>
      </StyledReportSettings>
    )
  }
}

ReportSettings.contextTypes = {
  intl: intlShape
}

ReportSettings.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  listApp: PropTypes.func.isRequired,
  formApp: PropTypes.func.isRequired,
  settingsDefinition: reportSettingsDefinitionPropType.isRequired
}

export default ReportSettings

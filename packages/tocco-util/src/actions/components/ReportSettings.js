import React from 'react'
import PropTypes from 'prop-types'
import {Button, ButtonGroup} from 'tocco-ui'
import {FormattedMessage, intlShape} from 'react-intl'

import {defaultModelTransformer} from '../../rest'
import SimpleFormContainer from './../containers/SimpleFormContainer'
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
import {downloadSupportedByBrowser} from '../../download/download'

class ReportSettings extends React.Component {
  constructor(props) {
    super(props)

    this.customSettingsDefined
      = props.settingsDefinition.customSettings && props.settingsDefinition.customSettings.entity
    this.state = {
      valid: false,
      customSettingsValid: !this.customSettingsDefined
    }
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
        <SimpleFormContainer
          form={getFormDefinition(settingsDefinition, this.context.intl)}
          model={getModel(settingsDefinition)}
          noButtons
          onChange={({values, valid}) => { this.handleSettingsChange(values, valid) }}
          formData={getFormDataDefaults(settingsDefinition)}
        />
        {this.customSettingsDefined
        && <SimpleFormContainer
          form={settingsDefinition.customSettings.form.form}
          model={defaultModelTransformer(settingsDefinition.customSettings.entity)}
          noButtons
          onChange={({values, valid}) => { this.handleCustomSettingsChange(values, valid) }}
        />
        }
        <ButtonGroup>
          {downloadSupportedByBrowser()
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
  settingsDefinition: reportSettingsDefinitionPropType.isRequired
}

export default ReportSettings

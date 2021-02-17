import React from 'react'
import PropTypes from 'prop-types'
import {Button} from 'tocco-ui'
import {FormattedMessage, injectIntl, intlShape} from 'react-intl'
import {download} from 'tocco-util'

import simpleFormConnector from '../containers/simpleFormConnector'
import {
  getFormDataDefaults,
  getFormDefinition,
  getGroupedValues,
  reportSettingsDefinitionPropType,
  transformValues,
  submitActions
} from '../utils/report'
import {StyledStickyButtons, StyledReportSettings} from './StyledReportSettings'

export class ReportSettings extends React.Component {
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
    const {intl, settingsDefinition} = this.props
    return (
      <StyledReportSettings>
        <this.SimpleFormContainer
          listApp={this.props.listApp}
          form={getFormDefinition(settingsDefinition, intl)}
          noButtons
          onChange={({values, valid}) => {
            this.handleSettingsChange(values, valid)
          }}
          defaultValues={getFormDataDefaults(settingsDefinition)}
          mode="create"
        />
        {this.customSettingsDefined
        && <this.SimpleFormContainer
          listApp={this.props.listApp}
          form={settingsDefinition.customSettings.form.form}
          noButtons
          onChange={({values, valid}) => {
            this.handleCustomSettingsChange(values, valid)
          }}
          mode="create"
        />
        }
        <StyledStickyButtons>
          {download.downloadSupportedByBrowser()
          && <Button
            ink="primary"
            disabled={!this.state.customSettingsValid || !this.state.valid}
            icon="download"
            onClick={this.handleButtonClick(submitActions.DOWNLOAD)}
            look="raised"
          >
            <FormattedMessage id="client.common.report.download"/>
          </Button>
          }
          <Button
            disabled={!this.state.customSettingsValid || !this.state.valid}
            icon="file"
            onClick={this.handleButtonClick(submitActions.DISPLAY)}
            look="raised"
          >
            <FormattedMessage id="client.common.report.display"/>
          </Button>
        </StyledStickyButtons>
      </StyledReportSettings>
    )
  }
}

ReportSettings.propTypes = {
  intl: intlShape.isRequired,
  onSubmit: PropTypes.func.isRequired,
  listApp: PropTypes.func.isRequired,
  formApp: PropTypes.func.isRequired,
  settingsDefinition: reportSettingsDefinitionPropType.isRequired
}

export default injectIntl(ReportSettings)

import React from 'react'
import PropTypes from 'prop-types'
import {Button} from 'tocco-ui'
import {FormattedMessage, injectIntl, intlShape} from 'react-intl'

import simpleFormConnector from '../containers/simpleFormConnector'
import {
  getFormDefinition,
  getGroupedValues,
  reportSettingsDefinitionPropType,
  transformValues
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

  handleButtonClick = () => () => {
    const groupedValues = {
      ...getGroupedValues(this.props.settingsDefinition, transformValues(this.state.values)),
      customSettings: this.state.customSettings
    }

    this.props.onSubmit(groupedValues)
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
          <Button
            ink="primary"
            disabled={!this.state.customSettingsValid || !this.state.valid}
            icon="download"
            onClick={this.handleButtonClick()}
            look="raised"
          >
            <FormattedMessage id="client.common.report.generate"/>
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

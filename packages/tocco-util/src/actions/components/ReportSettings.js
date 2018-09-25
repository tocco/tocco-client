import React from 'react'
import PropTypes from 'prop-types'
import {Button} from 'tocco-ui'
import {FormattedMessage, intlShape} from 'react-intl'

import {defaultModelTransformer} from '../../rest'
import SimpleFormContainer from './../containers/SimpleFormContainer'
import {
  getFormDataDefaults,
  getModel,
  getFormDefinition,
  getGroupedValues,
  reportSettingsDefinitionPropType
} from '../utils/report'
import StyledReportSettings from './StyledReportSettings'

class ReportSettings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      valid: false,
      customSettingsValid: false
    }
  }

  handleSettingsChange = (values, valid) => {
    this.setState({...this.state, values, valid})
  }

  handleCustomSettingsChange = (customSettingValues, customSettingsValid) => {
    this.setState({...this.state, customSettingValues, customSettingsValid})
  }

  handleDownloadClick = () => {
    const groupedValues = {
      ...getGroupedValues(this.props.settingsDefinition, this.state.values),
      customSettingValues: this.state.customSettingValues
    }

    this.props.onSubmit(groupedValues)
  }

  render() {
    const {settingsDefinition} = this.props

    const DownloadButton = () =>
      <Button
        disabled={!this.state.customSettingsValid || !this.state.valid}
        icon="download"
        look="raised"
        onClick={this.handleDownloadClick}
      >
        <FormattedMessage id="client.common.report.download"/>
      </Button>

    return (
      <StyledReportSettings>
        <SimpleFormContainer
          form={getFormDefinition(settingsDefinition, this.context.intl)}
          model={getModel(settingsDefinition)}
          noButtons
          onChange={({values, valid}) => { this.handleSettingsChange(values, valid) }}
          formData={getFormDataDefaults(settingsDefinition)}
        />
        {settingsDefinition.customSettings
          && <SimpleFormContainer
            form={settingsDefinition.customSettings.form.form}
            model={defaultModelTransformer(settingsDefinition.customSettings.entity)}
            noButtons
            onChange={({values, valid}) => { this.handleCustomSettingsChange(values, valid) }}
          />
        }
        <DownloadButton/>
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

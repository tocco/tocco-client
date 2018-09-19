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

class ReportSettings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
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
        onClick={this.handleDownloadClick}
        disabled={this.state.customSettingsValid === false || this.state.valid === false}
        icon="download"
        ink="primary"
      >
        <FormattedMessage id="client.common.report.download"/>
      </Button>

    return (
      <span>
        <DownloadButton/>
        <SimpleFormContainer
          form={getFormDefinition(settingsDefinition, this.context.intl)}
          model={getModel(settingsDefinition)}
          noButtons
          onChange={({values, valid}) => { this.handleSettingsChange(values, valid) }}
          formData={getFormDataDefaults(settingsDefinition)}
        />
        {settingsDefinition.customSettings
        && <div style={{marginTop: '15px'}}>
          <SimpleFormContainer
            form={settingsDefinition.customSettings.form.form}
            model={defaultModelTransformer(settingsDefinition.customSettings.entity)}
            noButtons
            onChange={({values, valid}) => { this.handleCustomSettingsChange(values, valid) }}
          />
        </div>
        }
        <DownloadButton/>
      </span>
    )
  }
}

ReportSettings.contextTypes = {
  intl: intlShape
}

ReportSettings.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  settingsDefinition: reportSettingsDefinitionPropType
}

export default ReportSettings

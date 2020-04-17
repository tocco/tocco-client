import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import {theme} from 'tocco-ui'

import MergeMatrixContainer from './../../containers/MergeMatrixContainer'
import MergeStrategyContainer from './../../containers/MergeStrategyContainer'
import {Wizard} from './../Wizard'
import MergeResponse from './MergeResponse'

const StyledWizardWrapper = styled.div`
  background-color: ${theme.color('paper')};
  padding: 5px;
`
class MergeStrategy extends React.Component {
  render() {
    const saveButtonLabel = this.props.intl.formatMessage({id: 'client.merge.saveButton'})

    if (!this.props.mergeResponse.merged) {
      return (
        <StyledWizardWrapper>
          <Wizard
            save={{fn: this.props.saveMerge, label: saveButtonLabel}}
            intl={this.props.intl}
          >
            <MergeStrategyContainer/>
            <MergeMatrixContainer/>
          </Wizard>
        </StyledWizardWrapper>
      )
    } else {
      return (
        <MergeResponse
          mergeResponse={this.props.mergeResponse}
          intl={this.props.intl}
          fireExternalEvent={this.props.fireExternalEvent}
        />
      )
    }
  }
}

MergeStrategy.propTypes = {
  saveMerge: PropTypes.func.isRequired,
  fireExternalEvent: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  mergeResponse: PropTypes.object
}

export default MergeStrategy

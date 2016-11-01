import React from 'react'

import MergeMatrixContainer from './../../containers/MergeMatrixContainer'
import MergeStrategyContainer from './../../containers/MergeStrategyContainer'

import {Wizard} from './../Wizard'
import MergeResponse from './MergeResponse'

import './styles.scss'

class MergeStrategy extends React.Component {
  render() {
    var saveButtonLabel = this.props.intl.formatMessage({id: 'client.entityoperation.action.merge.saveButton'})

    if (!this.props.mergeResponse.merged) {
      return (
        <div>
          <Wizard save={{fn: this.props.saveMerge, label: saveButtonLabel}}>
            <MergeStrategyContainer/>
            <MergeMatrixContainer/>
          </Wizard>
        </div>
      )
    } else {
      return (
        <MergeResponse
          mergeResponse={this.props.mergeResponse}
          intl={this.props.intl}
        />
      )
    }
  }
}

MergeStrategy.propTypes = {
  saveMerge: React.PropTypes.func.isRequired,
  intl: React.PropTypes.object.isRequired,
  mergeResponse: React.PropTypes.object
}

export default MergeStrategy

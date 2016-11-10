import React from 'react'

import MergeMatrixContainer from './../../containers/MergeMatrixContainer'
import MergeStrategyContainer from './../../containers/MergeStrategyContainer'

import {Wizard} from './../Wizard'
import MergeResponse from './MergeResponse'

import './styles.scss'

class MergeStrategy extends React.Component {
  render() {

    const saveButtonLabel = this.props.intl.formatMessage({id: 'client.merge.saveButton'})

    let content
    if (!this.props.mergeResponse.merged) {
      content = (
        <div >
          <Wizard save={{fn: this.props.saveMerge, label: saveButtonLabel}}>
            <MergeStrategyContainer/>
            <MergeMatrixContainer/>
          </Wizard>
        </div>
      )
    } else {
      content = (
        <MergeResponse className="merge-wizard"
                       mergeResponse={this.props.mergeResponse}
                       intl={this.props.intl}
        />
      )
    }
    return (
      <div className="merge-wizard">
        {content}
      </div>
    )
  }
}

MergeStrategy.propTypes = {
  saveMerge: React.PropTypes.func.isRequired,
  intl: React.PropTypes.object.isRequired,
  mergeResponse: React.PropTypes.object
}

export default MergeStrategy

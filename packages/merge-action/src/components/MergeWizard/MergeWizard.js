import React from 'react'
import {injectIntl} from 'react-intl'

import MergeMatrixContainer from './../../containers/MergeMatrixContainer'
import MergeStrategyContainer from './../../containers/MergeStrategyContainer'

import {Wizard} from './../Wizard'

class MergeStrategy extends React.Component {
  render() {
    var saveButtonLabel = this.props.intl.formatMessage({id: 'client.entityoperation.action.merge.saveButton'})
    return (
      <div>
        <Wizard save={{fn: this.props.saveMerge, label: saveButtonLabel}}>
          <MergeStrategyContainer/>
          <MergeMatrixContainer/>
        </Wizard>
      </div>
    )
  }
}

MergeStrategy.propTypes = {
  saveMerge: React.PropTypes.func.isRequired,
  intl: React.PropTypes.object.isRequired
}

export default injectIntl(MergeStrategy)

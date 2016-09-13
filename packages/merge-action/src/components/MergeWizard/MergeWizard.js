import React from 'react'


import MergeMatrixContainer from './../../containers/MergeMatrixContainer'
import MergeStrategyContainer from './../../containers/MergeStrategyContainer'

import {Wizard} from './../Wizard'

class MergeStrategy extends React.Component {
  render() {
    
    return (
      <div>
        <Wizard save={{fn: this.props.saveMerge, label: 'Zusammenführen'}}>
          <MergeStrategyContainer/>
          <MergeMatrixContainer/>

        </Wizard>
      </div>
    )
  }
}

MergeStrategy.propTypes = {
  saveMerge: React.PropTypes.func.isRequired
}

export default MergeStrategy

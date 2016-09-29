import React from 'react'
import SaveButton from './'
// real-import:import {SaveButton} from 'tocco-ui'

export default () => {
  return (
    <div>
      {/* start example */}
      <SaveButton
        label="Test Save"
        onClick={() => alert('save')}
      />
      {/* end example */}
    </div>
  )
}

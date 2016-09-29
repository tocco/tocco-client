import React from 'react'
import LoadMask from './'
// real-import:import {LoadMask} from 'tocco-ui'

export default () => {
  const promise = new Promise(resolve => {
  })
  return (
    <div style={{height: '50px'}}>
      {/* start example */}
      <LoadMask
        promises={[promise]}
      >
        <div>LOADED</div>
      </LoadMask>
      {/* end example */}
    </div>
  )
}


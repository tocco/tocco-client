/* eslint no-console: 0 */
import React from 'react'

import SomeOfButton from './'
// real-import:import {SomeOfButton} from 'tocco-ui'

export default () => {
  return (
    <div>
      {/* start example */}
      <SomeOfButton
        of={2}
        onClick={() => alert('do something')}
      />
      <SomeOfButton
        dense
        ink="primary"
        look="raised"
        of={5}
        onClick={() => alert('do something')}
      />
      <SomeOfButton
        disabled
        ink="primary"
        look="raised"
        of={123}
        onClick={() => alert('do something')}
        title="Disabled SomeOfButton"
      />
      <SomeOfButton
        look="raised"
        of={123456789}
        onClick={() => alert('do something')}
        some={12345}
      />
      {/* end example */}
    </div>
  )
}

/* eslint no-console: 0 */
import React from 'react'

import SomeOf from './'
// real-import:import {SomeOf} from 'tocco-ui'

export default () => {
  return (
    <div>
      {/* start example */}
      <SomeOf of={12} />
      <br />
      <SomeOf some={9} of={8048} />

      {/* end example */}
    </div>
  )
}

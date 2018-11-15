/* eslint no-console: 0 */
import React from 'react'

import MultiCheckbox from './'
// real-import:import {MultiCheckbox} from 'tocco-ui'

export default () => {
  return (
    <div>
      {/* start example */}
      <MultiCheckbox
        cbCheck={() => console.log('now is checked')}
        cbUncheck={() => console.log('now is unchecked')}
      />
      <MultiCheckbox
        status="checked"
        cbCheck={() => console.log('now is checked')}
        cbUncheck={() => console.log('now is unchecked')}
      />
      <MultiCheckbox
        status="indeterminate"
        cbCheck={() => console.log('now is checked')}
        cbUncheck={() => console.log('now is unchecked')}
      />
      {/* end example */}
    </div>
  )
}

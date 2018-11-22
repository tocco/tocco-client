/* eslint no-console: 0 */
import React from 'react'

import MultiCheckbox from './'
// real-import:import {MultiCheckbox} from 'tocco-ui'

const cb = state => state === 'checked' ? console.log('now is checked') : console.log('now is unchecked')

export default () => {
  return (
    <div>
      {/* start example */}
      <MultiCheckbox
        onChange={cb}
      />
      <MultiCheckbox
        status="checked"
        onChange={cb}
      />
      <MultiCheckbox
        status="indeterminate"
        onChange={cb}
      />
      {/* end example */}
    </div>
  )
}

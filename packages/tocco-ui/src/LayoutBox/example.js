/* eslint no-console: 0 */
import React from 'react'

import LayoutBox from './'
// real-import:import {LayoutBox} from 'tocco-ui'

export default () => {
  return (
    <div>
      {/* start example */}
      <LayoutBox alignment="horizontal" label="Label 1">
        <LayoutBox alignment="horizontal">
          <div>Child1</div>
        </LayoutBox>
        <div>Child 2</div>
        <LayoutBox alignment="vertical" label="Label 2">
          <div>Child 3</div>
        </LayoutBox>
      </LayoutBox>
      {/* end example */}
    </div>
  )
}

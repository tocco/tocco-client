import React from 'react'
import Popover from './'
import Button from '../Button'
// real-import:import {Popover} from 'tocco-ui'

export default () => {
  return (
    <div>
      {/* start example */}
      <Popover content={<img src="https://picsum.photos/200/200" width="200" height="200"/>} placement="top">
        <Popover content={<div>Bottom.</div>} placement="bottom">
          <Button label="Hover me"/>
        </Popover>
      </Popover>
      {/* end example */}
    </div>
  )
}

import React from 'react'
import Button from './'
// real-import:import {Button} from 'tocco-ui'

export default () => {
  return (
    <div>
      {/* start example */}
      <Button
        label="Save"
        icon="glyphicon-floppy-save"
        onClick={() => alert('do something')}
      />

      <Button
        label="Pending"
        pending
        onClick={() => alert('do something')}
      />

      <Button
        label="Disabled"
        disabled
        onClick={() => alert('do something')}
      />
      {/* end example */}
    </div>
  )
}

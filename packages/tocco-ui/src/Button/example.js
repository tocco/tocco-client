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
        onClick={() => alert('do something')}
        pending="true"
      />

      <Button
        label="Disabled"
        disabled="true"
        onClick={() => alert('do something')}
      />
      {/* end example */}
    </div>
  )
}

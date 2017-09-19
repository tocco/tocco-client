/* eslint no-console: 0 */
import React from 'react'
import Button from './'
// real-import:import {Button} from 'tocco-ui'

export default () => {
  return (
    <div>
      {/* start example */}
      <Button
        label="Primary"
        primary
      />
      <Button
        icon="glyphicon-heart"
        type="submit"
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

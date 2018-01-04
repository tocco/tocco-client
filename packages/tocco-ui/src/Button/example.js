/* eslint no-console: 0 */
import React from 'react'
import Button from './'
// real-import:import {Button} from 'tocco-ui'

export default () => {
  return (
    <div>
      {/* start example */}
      <Button
        label={<strong>Primary</strong>}
        primary
      />
      <Button
        icon="glyphicon-heart"
        type="submit"
      />
      <Button
        icon="fa-font-awesome"
        type="submit"
        label="fa"
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
        title="This button is disabled"
      />
      {/* end example */}
    </div>
  )
}

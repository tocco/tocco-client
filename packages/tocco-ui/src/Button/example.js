/* eslint no-console: 0 */
import React from 'react'
import Button from './'
// real-import:import {Button} from 'tocco-ui'

export default () => {
  return (
    <div>
      {/* start example */}
      <Button
        label="Base color flat"
      />
      <Button
        ink="primary"
        label="Primary color flat"
      />
      <Button
        look="raised"
        label="Base color raised"
      />
      <Button
        look="raised"
        ink="primary"
        label="Primary color raised"
      />
      <Button
        look="raised"
        dense
        icon="fa-hand-spock-o"
        label="Dense"
      />
      <Button
        icon="fa-font-awesome"
        iconPosition="append"
        label="Icon with text"
        type="submit"
      />
      <Button
        title="Icon without text"
        icon="glyphicon-heart"
        iconPosition="sole"
      />
      <Button
        label="Pending"
        onClick={() => alert('do something')}
        pending
      />
      <Button
        disabled
        label="Disabled"
        onClick={() => alert('do something')}
        title="This button is disabled"
      />
      <Button title="My Title">
        <u><i>Child Element</i></u>
      </Button>
      {/* end example */}
    </div>
  )
}

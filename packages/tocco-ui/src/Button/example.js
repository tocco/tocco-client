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
        label="Base color raised"
        look="raised"
      />
      <Button
        ink="primary"
        label="Primary color raised"
        look="raised"
      />
      <Button
        dense
        icon="hand-peace"
        label="Dense"
        look="raised"
      />
      <Button
        icon="handshake"
        iconPosition="append"
        label="Icon with text"
        type="submit"
      />
      <Button
        icon="hand-spock"
        iconPosition="sole"
        title="Icon without text"
      />
      <Button
        disabled
        label="Disabled"
        onClick={() => alert('do something')}
        title="This button is disabled"
      />
      <Button
        label="Pending"
        onClick={() => alert('do something')}
        pending
      />
      <Button
        ink="primary"
        label="Pending"
        onClick={() => alert('do something')}
        pending
      />
      <Button
        label="Pending"
        look="raised"
        onClick={() => alert('do something')}
        pending
      />
      <Button
        ink="primary"
        label="Pending"
        look="raised"
        onClick={() => alert('do something')}
        pending
      />
      {/* end example */}
    </div>
  )
}

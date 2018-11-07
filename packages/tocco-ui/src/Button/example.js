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
        onClick={() => alert('do something')}
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
        icon="handshake"
        iconPosition="append"
        label="Icon with text"
        type="submit"
      />
      <Button
        dense
        icon="hand-peace"
        label="Dense"
        look="raised"
      />
      <Button
        icon="hand-spock"
        iconPosition="sole"
        title="Icon without text"
      />
      <Button
        disabled
        icon="handshake"
        ink="primary"
        label="Disabled"
        look="raised"
      />
      <Button
        ink="primary"
        label="Pending"
        pending
      />
      {/* end example */}
    </div>
  )
}

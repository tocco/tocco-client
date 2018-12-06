/* eslint no-console: 0 */
import React from 'react'

import Button from './'
// real-import:import {Button} from 'tocco-ui'

class Examlple extends React.Component {
  constructor(props) {
    super(props)
    this.state = {pending: true}
  }

  render() {
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
          icon="fab, facebook"
          label="Brand Icon"
        />
        <Button
          dense
          icon="hand-peace"
          label="Dense"
          look="raised"
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
          icon="air-freshener"
          label={`${this.state.pending ? '' : 'Not '}Pending (Click me)`}
          pending={this.state.pending}
          onClick={() => this.setState({pending: !this.state.pending})}
        />
        <Button
          icon="times"
          look="ball" />
        <Button
          icon="hand-spock"
          iconPosition="sole"
          look="ball"
          title="Ball button with icon"
        />
        <Button
          icon="handshake"
          iconPosition="sole"
          look="ball"
          title="Ball button with icon"
        />
        <Button
          look="ball"
          label="Ball"
        />
        {/* end example */}
      </div>
    )
  }
}

export default () => <Examlple/>

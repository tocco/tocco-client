import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import {withKnobs, select, boolean, text} from '@storybook/addon-knobs'
import _pick from 'lodash/pick'

import Button from './'
import {stylingInk, stylingPosition, stylingLook} from '../utilStyles'

class ButtonStory extends React.Component {
  state = {pending: true}

  render() {
    return (
      <span>
        <Button
          ink="primary"
          icon="air-freshener"
          pending={this.state.pending}
          label={`${this.state.pending ? '' : 'Not '}Pending (Click me)`}
          onClick={() => this.setState({pending: !this.state.pending})}
        />
      </span>
    )
  }
}

storiesOf('Button', module)
  .addDecorator(withKnobs)
  .add(
    'Knobs',
    () =>
      (
        <Button
          label={text('label', 'My Button')}
          ink={select('ink', {'-': null, ...stylingInk}) || undefined}
          icon={select('icon', {
            '-': null,
            regular: 'air-freshener',
            brand: ['fab', 'google'],
            times: 'times'}) || undefined
          }
          onClick={action('clicked')}
          look={select('look', {'-': null, ..._pick(stylingLook, ['BALL', 'FLAT', 'RAISED'])}) || undefined}
          iconPosition={select('iconPosition', {
            '-': null,
            ..._pick(stylingPosition, ['APPEND', 'PREPEND', 'SOLE'])}) || undefined
          }
          pending={boolean('pending', false) || undefined}
          dense={boolean('dense', false) || undefined}
          title={text('title')}
          disabled={boolean('disabled', false)}
          type={select('type', ['button', 'submit', 'reset'] || undefined)}
        />
      )
  )
  .add(
    'Showcase',
    () => {
      return [
        <Button
          key="1"
          label="Base color flat"
          onClick={() => alert('do something')}
        />,
        <Button
          key="2"
          ink="primary"
          label="Primary color flat"
        />,
        <Button
          key="3"
          label="Base color raised"
          look="raised"
        />,
        <Button
          key="4"
          ink="primary"
          label="Primary color raised"
          look="raised"
        />,
        <Button
          key="5"
          icon="handshake"
          iconPosition="append"
          label="Icon with text"
          type="submit"
        />,
        <Button
          key="6"
          icon="fab, facebook"
          label="Brand Icon"
        />,
        <Button
          key="7"
          dense
          icon="hand-peace"
          label="Dense"
          look="raised"
        />,
        <Button
          key="8"
          disabled
          icon="handshake"
          ink="primary"
          label="Disabled"
          look="raised"
        />,
        <ButtonStory key="9"/>,
        <Button
          key="10"
          icon="times"
          look="ball" />
      ]
    }, {info: {propTablesExclude: [ButtonStory], source: false}}
  )

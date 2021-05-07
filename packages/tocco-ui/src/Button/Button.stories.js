import React from 'react'
import {action} from '@storybook/addon-actions'

import Button from './'

export default {
  title: 'Tocco-UI/Button',
  component: Button,
  argTypes: {
    label: {
      type: 'string'
    },
    look: {
      options: ['raised', 'flat']
    },
    ink: {
      options: ['base', 'primary']
    },
    iconPosition: {
      options: ['append', 'prepend']
    },
    children: {
      control: false
    }
  }
}

export const Basic = args => (
  <Button
    {...args}
  />
)

Basic.args = {label: 'Button', icon: 'cog'}

export const Showcase = () => <span>
  <Button
    key="1"
    label="Base color flat"
    onClick={action('clicked')}
  />
  <Button
    ink="primary"
    key="2"
    label="Primary color flat"
  />
  <Button
    key="3"
    label="Base color raised"
    look="raised"
  />
  <Button
    ink="primary"
    key="4"
    label="Primary color raised"
    look="raised"
  />
  <Button
    icon="cog"
    iconPosition="append"
    key="5"
    label="Icon append"
    type="submit"
  />
  <Button
    icon="facebook"
    key="6"
    label="Icon prepend"
  />
  <Button
    icon="google"
    ink="primary"
    key="9"
    label="Pending"
    pending={true}
  />
  <Button
    key="13"
    look="raised"
  >
    <i>child</i><b>child2</b>
  </Button>
  <Button
    icon={'angle-up'}
    iconPosition="append"
    label="Menu"
  />
</span>

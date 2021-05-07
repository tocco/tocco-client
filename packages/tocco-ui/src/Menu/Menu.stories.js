import React from 'react'
import {action} from '@storybook/addon-actions'

import {MenuItem, ButtonMenu, BallMenu} from './'

export default {
  title: 'Tocco-UI/Menu',
  component: ButtonMenu,
  argTypes: {
    label: {type: 'string', defaultValue: 'Menu Button!'},
    buttonProps: {type: 'object', defaultValue: {look: 'raised'}}
  }
}

export const Basic = args => <ButtonMenu {...args}>
  {getMenuItems()}
</ButtonMenu>

export const ButtonMenuDefault = args => (
  <ButtonMenu {...args}>
    {getMenuItems()}
  </ButtonMenu>
)

ButtonMenuDefault.argTypes = {
  onClick: {action: 'onClick'}
}

export const Ball = args => <BallMenu {...args}>
  {getMenuItems()}
</BallMenu>

Ball.argTypes = {
  buttonProps: {type: 'object', defaultValue: {icon: 'ellipsis-v', look: 'raised'}}
}

const getMenuItems = () => <MenuItem>
  <MenuItem title={'1 title'} onClick={action('1 Clicked')}>1</MenuItem>
  <MenuItem title={'2 title'} onClick={action('clicked 2')}>2</MenuItem>
  <MenuItem isGroup={true} onClick={action('clicked 3')}>
    3
    <MenuItem onClick={action('clicked 3.1')}>3.1</MenuItem>
    <MenuItem disabled title="disabled!" onClick={action('clicked 3.2')}>3.2 (disabled)</MenuItem>
    <MenuItem>
      3.3 (No onclick)
      <MenuItem onClick={action('clicked 3.3.1')}>3.3.1</MenuItem>
      <MenuItem onClick={action('clicked 3.3.1')}>
        3.3.2 very long text very long text very long text very long text
      </MenuItem>
    </MenuItem>
  </MenuItem>
</MenuItem>

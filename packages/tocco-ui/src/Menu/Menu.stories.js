import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import {MenuItem, ButtonMenu, BallMenu} from './'

const getMenuItems = () => <MenuItem>
  <MenuItem title={'1 title'} onClick={action('1 Clicked')}>1</MenuItem>
  <MenuItem title={'2 title'} onClick={action('clicked 2') }>2</MenuItem>
  <MenuItem isGroup={true} onClick={action('clicked 3') }>
    3
    <MenuItem onClick={action('clicked 3.1') }>3.1</MenuItem>
    <MenuItem disabled title="disabled!" onClick={action('clicked 3.2') }>3.2 (disabled)</MenuItem>
    <MenuItem>
      3.3 (No onclick)
      <MenuItem onClick={action('clicked 3.3.1') }>3.3.1</MenuItem>
      <MenuItem onClick={action('clicked 3.3.1') }>
        3.3.2 very long text very long text very long text very long text
      </MenuItem>
    </MenuItem>
  </MenuItem>
</MenuItem>

storiesOf('Tocco-UI | Menu', module)
  .add(
    'ButtonMenu',
    () => <ButtonMenu label="Menu Button" buttonProps={{look: 'raised'}}>
      {getMenuItems()}
    </ButtonMenu>

  )
  .add(
    'ButtonMenu with default',
    () => <ButtonMenu label="Menu Button" onClick={action('clicked button')} buttonProps={{look: 'raised'}}>
      {getMenuItems()}
    </ButtonMenu>

  )
  .add(
    'BallMenu',
    () => <BallMenu buttonProps={{icon: 'ellipsis-v', look: 'raised'}}>
      {getMenuItems()}
    </BallMenu>

  )

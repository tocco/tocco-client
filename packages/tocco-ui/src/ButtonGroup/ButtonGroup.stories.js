import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import ButtonGroup from './'
import Button from '../Button/Button'
import {ButtonMenu, MenuItem} from '../Menu'
storiesOf('Tocco-UI | Buttons / ButtonGroup', module)
  .add(
    'ButtonGroup Raised',
    () => (
      <ButtonGroup>
        <Button label="Lorem ipsum dolor" look="raised"/>
        <Button label="Lorem ipsum dolor 2" look="raised" ink="primary"/>
        <Button label="Lorem ipsum dolor 2" look="raised"/>
        <Button label="Quisquam modi nam" look="raised"/>
      </ButtonGroup>
    )
  )
  .add(
    'ButtonGroup',
    () => (
      <ButtonGroup>
        <Button label="Lorem ipsum dolor"/>
        <Button label="Lorem ipsum dolor 2" ink="primary"/>
        <Button label="Lorem ipsum dolor 2"/>
        <Button label="Quisquam modi nam"/>
      </ButtonGroup>
    )
  )
  .add(
    'ButtonGroup Default Button',
    () => (
      <>
        <ButtonGroup>
          <Button label="Lorem ipsum dolor" look="raised"/>

          <ButtonMenu label="Menu Button" onClick={action('clicked button')} buttonProps={{look: 'raised'}}>
            <MenuItem>
              <MenuItem title={'1 title'} onClick={action('1 Clicked')}>1</MenuItem>
              <MenuItem title={'2 title'} onClick={action('clicked 2') }>2</MenuItem>
            </MenuItem>
          </ButtonMenu>
          <Button label="Quisquam modi nam" look="raised"/>
        </ButtonGroup>
        <br />
        <ButtonGroup>
          <Button label="Lorem ipsum dolor" />
          <ButtonMenu label="Menu Button" onClick={action('clicked button')}>
            <MenuItem>
              <MenuItem title={'1 title'} onClick={action('1 Clicked')}>1</MenuItem>
              <MenuItem title={'2 title'} onClick={action('clicked 2') }>2</MenuItem>
            </MenuItem>
          </ButtonMenu>
          <Button label="Quisquam modi nam"/>
        </ButtonGroup>
      </>
    )
  )

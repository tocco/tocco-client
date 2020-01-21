import React from 'react'
import {storiesOf} from '@storybook/react'

import ButtonGroup from './'
import Button from '../Button/Button'
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

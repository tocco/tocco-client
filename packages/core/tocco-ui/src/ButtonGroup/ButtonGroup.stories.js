import React from 'react'

import Button from '../Button/Button'
import ButtonGroup from './'

export default {
  title: 'Tocco-UI/Button/ButtonGroup',
  component: ButtonGroup
}

export const Basic = () => (
  <ButtonGroup>
    <Button label="Lorem ipsum dolor" />
    <Button label="Lorem ipsum dolor 2" ink="primary" />
    <Button label="Lorem ipsum dolor 2" />
    <Button label="Quisquam modi nam" />
  </ButtonGroup>
)

export const Raised = () => (
  <ButtonGroup>
    <Button label="Lorem ipsum dolor" look="raised" />
    <Button label="Lorem ipsum dolor 2" look="raised" ink="primary" />
    <Button label="Lorem ipsum dolor 2" look="raised" />
    <Button label="Quisquam modi nam" look="raised" />
  </ButtonGroup>
)

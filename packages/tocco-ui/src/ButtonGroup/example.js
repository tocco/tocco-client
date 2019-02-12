/* eslint no-console: 0 */
import React from 'react'

import Button from '../Button'
import ButtonLink from '../ButtonLink'
import ButtonGroup from './'
// real-import:import {ButtonGroup} from 'tocco-ui'

export default () => {
  return (
    <div>
      {/* start example */}
      <ButtonGroup>
        <Button label="A" ink="primary"/>
        <ButtonLink href="#ButtonGroup" label="B"/>
      </ButtonGroup>
      <ButtonGroup ink="primary">
        <Button label="C"/>
        <ButtonLink href="#ButtonGroup" label="D"/>
        <Button label="E" ink="base"/>
      </ButtonGroup>
      <ButtonGroup look="raised">
        <Button label="F" ink="primary"/>
        <Button label="G"/>
        <Button label="H"/>
        <ButtonLink href="#ButtonGroup" label="I"/>
      </ButtonGroup>
      <ButtonGroup look="raised" ink="primary">
        <Button label="Lorem ipsum dolor"/>
        <ButtonLink href="#ButtonGroup" label="Sit amet consectetur adipisicing"/>
        <Button label="Quisquam modi nam" ink="base"/>
      </ButtonGroup>

      <ButtonGroup melt>
        <Button label="A" ink="primary"/>
        <ButtonLink href="#ButtonGroup" label="B"/>
      </ButtonGroup>
      <ButtonGroup melt ink="primary">
        <Button label="C"/>
        <ButtonLink href="#ButtonGroup" label="D"/>
        <Button label="E" ink="base"/>
      </ButtonGroup>
      <ButtonGroup melt look="raised">
        <Button label="F" ink="primary"/>
        <Button label="G"/>
        <Button label="H"/>
        <ButtonLink href="#ButtonGroup" label="I"/>
      </ButtonGroup>
      <ButtonGroup melt look="raised" ink="primary">
        <Button label="Lorem ipsum dolor"/>
        <ButtonLink href="#ButtonGroup" label="Sit amet consectetur adipisicing"/>
        <Button label="Quisquam modi nam" ink="base"/>
      </ButtonGroup>
      {/* end example */}
    </div>
  )
}

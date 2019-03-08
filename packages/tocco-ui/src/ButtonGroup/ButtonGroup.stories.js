import React from 'react'
import {storiesOf} from '@storybook/react'
import {boolean, select, withKnobs} from '@storybook/addon-knobs'
import _pick from 'lodash/pick'

import ButtonGroup from './'
import Button from '../Button/Button'
import ButtonLink from '../ButtonLink/ButtonLink'
import {design} from '../utilStyles'

storiesOf('ButtonGroup', module)
  .addDecorator(withKnobs)
  .add(
    'ButtonGroup',
    () => (
      <ButtonGroup
        ink={select('ink', design.ink)}
        look={select('look', {'-': null, ..._pick(design.look, ['FLAT', 'RAISED'])}) || undefined}
        melt={boolean('melt', false)}
      >
        <Button label="Lorem ipsum dolor"/>
        <ButtonLink href="#ButtonGroup" label="Sit amet consectetur adipisicing"/>
        <Button label="Quisquam modi nam"/>
      </ButtonGroup>
    )
  )

import React from 'react'
import {storiesOf} from '@storybook/react'
import {boolean, select, withKnobs} from '@storybook/addon-knobs'

import Popover from './Popover'
import Button from '../Button'
import Typography from '../Typography'
import {Typography as RawTypography} from '../Typography/Typography'

storiesOf('Tocco-UI | Popover', module)
  .addDecorator(withKnobs)
  .add(
    'Popover',
    () =>
      <Popover
        content={<span><p>Popover</p><img src="https://picsum.photos/200/200" width="200" height="200"/></span>}
        rimless={boolean('rimless', true)}
        isPlainHtml={boolean('isPlainHtml', true)}
        placement={select('placement', ['top', 'bottom'])}
      >
        <Typography.Span>HOVER ME</Typography.Span>
      </Popover>,
    {info: {propTablesExclude: [Button, RawTypography, Typography.Span]}}
  )

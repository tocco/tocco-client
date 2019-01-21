import React from 'react'
import {storiesOf} from '@storybook/react'
import {boolean, number, select, withKnobs} from '@storybook/addon-knobs'

import Popover from './Popover'
import Button from '../Button'
import Typography from '../Typography'
import {Typography as RawTypography} from '../Typography/Typography'

const image = <img src="https://picsum.photos/200/200" width="200" height="200"/>

storiesOf('Popover', module)
  .addDecorator(withKnobs)
  .add(
    'Popover',
    () =>
      <Popover
        content={image}
        rimless={boolean('rimless', true)}
        isPlainHtml={boolean('isPlainHtml', true)}
        spacer={number('spacer', 10)}
        placement={select('placement', ['top', 'bottom'])}
      >
        <Typography.Span>Hover &lt;Span&gt;</Typography.Span>
        <Button label="Hover &lt;Button&gt;" />
      </Popover>,
    {info: {propTablesExclude: [Button, RawTypography, Typography.Span]}}
  )

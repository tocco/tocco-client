import React from 'react'

import Typography from '../Typography'
import Popover from './Popover'

export default {
  title: 'Tocco-UI/Popover',
  component: Popover,
  argTypes: {
    placement: {options: ['bottom', 'top']}
  }
}

export const Basic = args => (
  <Popover
    content={
      <span>
        <p>Popover</p>
        <img src="https://picsum.photos/200/200" width="200" height="200" />
      </span>
    }
    {...args}
  >
    <Typography.Span>HOVER ME</Typography.Span>
  </Popover>
)

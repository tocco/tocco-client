import React from 'react'

import Ball from './'

export default {
  title: 'Tocco-UI/Ball',
  component: Ball,
  argTypes: {
    look: {
      options: ['raised', 'flat']
    },
    ink: {
      options: ['base', 'primary']
    }
  }
}

export const Basic = args => <Ball
  {...args}
/>

Basic.args = {
  icon: 'cog'
}

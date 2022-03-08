import React from 'react'

import SomeOf from './'

export default {
  title: 'Tocco-UI/SomeOf',
  component: SomeOf,
  argTypes: {
    some: {type: 'number', defaultValue: 9},
    of: {type: 'number', defaultValue: 8048}
  }
}

export const Basic = args => <SomeOf {...args} />

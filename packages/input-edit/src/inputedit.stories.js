import React from 'react'
import {v4 as uuid} from 'uuid'

import InputEditApp from './main'

export default {
  title: 'Apps/Input Edit',
  component: InputEditApp,
  argTypes: {
    selection: {
      type: 'object',
      defaultValue: {type: 'ID', entityName: 'Input', ids: ['11']}
    }
  }
}

export const Basic = args => <InputEditApp
  key={uuid()}
  {...args}
/>

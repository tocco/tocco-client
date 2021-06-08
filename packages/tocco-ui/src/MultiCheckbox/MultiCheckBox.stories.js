import React from 'react'
import {action} from '@storybook/addon-actions'

import MultiCheckbox from './'
import {Typography} from '../index'

export default {
  title: 'Tocco-UI/Multi Checkbox',
  component: MultiCheckbox
}

export const Basic = () =>
  <div>
    <MultiCheckbox
      onChange={action('box-action')}
    />
    <MultiCheckbox
      value="checked"
      onChange={action('box-action')}
    />
    <MultiCheckbox
      value="indeterminate"
      onChange={action('box-action')}
    />
    <MultiCheckbox
      value="unchecked"
      onChange={action('box-action')}
      id={'linkedToLabel'}
    />
    <Typography.Label for={'linkedToLabel'}>Label</Typography.Label>
  </div>

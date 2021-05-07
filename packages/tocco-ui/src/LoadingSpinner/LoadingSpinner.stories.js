import React from 'react'

import LoadingSpinner from './LoadingSpinner'

export default {
  title: 'Tocco-UI/Loading Spinner',
  component: LoadingSpinner,
  argTypes: {
    size: {type: 'string', defaultValue: '40px'},
    style: {control: 'object', defaultValue: {color: 'red'}}
  }
}

export const Basic = args => <LoadingSpinner {...args}/>

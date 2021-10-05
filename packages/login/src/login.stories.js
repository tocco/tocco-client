import React, {useState} from 'react'
import {linkTo} from '@storybook/addon-links'
import {v4 as uuid} from 'uuid'

import LoginApp from './main'

export default {
  title: 'Apps/Login',
  component: LoginApp,
  argTypes: {
    username: {defaultValue: 'tocco'},
    showTitle: {defaultValue: true}
  }
}

export const LoginStory = ({...args}) => {
  const [confirmed, setConfirmed] = useState(false)
  return <LoginApp
    key={uuid()}
    {...args}
    loginSuccess={() => {
      if (!confirmed) {
        const redirect = confirm('Login successful. Redirect to Entity-Browser?')
        if (redirect) {
          linkTo('Apps/Entity Browser', 'Entity Browser Story')()
        } else {
          setConfirmed(true)
        }
      }
    }}
  />
}

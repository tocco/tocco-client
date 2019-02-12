import React from 'react'
import {storiesOf} from '@storybook/react'
import {withKnobs, boolean, text} from '@storybook/addon-knobs'
import {action} from '@storybook/addon-actions'

import LoginApp from './main'

storiesOf('Apps/Login', module)
  .addDecorator(withKnobs)
  .add(
    'Login',
    () => <LoginApp
      showTitle={boolean('showTitle', false)}
      locale={text('locale', 'de-CH')}
      passwordRequest={boolean('passwordRequest', false)}
      username={text('username', '')}

      success={action('success')}
      resize={action('resize')}
    />
  )

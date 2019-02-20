import React from 'react'
import {storiesOf} from '@storybook/react'
import {withKnobs, boolean, text} from '@storybook/addon-knobs'
import {action} from '@storybook/addon-actions'

import LoginApp from './main'

storiesOf('Apps/Login', module)
  .addDecorator(withKnobs)
  .add(
    'Login',
    () => <LoginAppWrapper/>
  )

class LoginAppWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.childKey = 0
  }

  render() {
    this.childKey++
    return (
      <div>
        <LoginApp
          key={this.childKey}
          showTitle={boolean('showTitle', false)}
          locale={text('locale', 'de-CH') || 'de-CH'}
          passwordRequest={boolean('passwordRequest', false)}
          username={text('username', 'Test User')}

          loginSuccess={action('success')}
        />
      </div>
    )
  }
}

import React from 'react'
import {storiesOf} from '@storybook/react'
import {withKnobs, boolean, select, text} from '@storybook/addon-knobs'
import {action} from '@storybook/addon-actions'
import {linkTo} from '@storybook/addon-links'

import LoginApp from './main'

storiesOf('Apps|Login', module)
  .addDecorator(withKnobs)
  .add(
    'tocco',
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
          locale={select('locale', ['de', 'en'])}
          passwordRequest={boolean('passwordRequest', false)}
          username={text('username', 'Tocco')}
          loginSuccess={() => {
            action('login success')()
            setTimeout(linkTo('Apps|Entity Browser', 'Entity Browser'), 1000)
          }}
        />
      </div>
    )
  }
}

import React from 'react'
import {storiesOf} from '@storybook/react'
import {withKnobs, boolean, text} from '@storybook/addon-knobs'
import {action} from '@storybook/addon-actions'
import {linkTo} from '@storybook/addon-links'
import {injectIntl, intlShape} from 'react-intl'

import LoginApp from './main'
import Readme from '../README.md'

storiesOf('Apps|Login', module)
  .addDecorator(withKnobs)
  .add(
    'Login',
    () => <LoginAppWrapperStoryIntl/>,
    {info: {disable: true}, notes: Readme}
  )

class LoginAppWrapperStory extends React.Component {
  key = 0
  confirmed = false

  render() {
    return (
      <div>
        <LoginApp
          key={this.key++}
          showTitle={boolean('showTitle', true)}
          locale={this.props.intl.locale}
          passwordRequest={boolean('passwordRequest', false)}
          username={text('username', 'tocco')}
          loginSuccess={() => {
            action('login success')()
            if (!this.confirmed) {
              const redirect = confirm('Login successful. Redirect to Entity-Browser?')
              if (redirect) {
                linkTo('Apps|Entity Browser', 'Entity Browser')()
              } else {
                this.confirmed = true
              }
            }
          }}
        />
      </div>
    )
  }
}

LoginAppWrapperStory.propTypes = {
  intl: intlShape
}

const LoginAppWrapperStoryIntl = injectIntl(LoginAppWrapperStory)
